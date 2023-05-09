import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, map } from 'rxjs';
import Podcast from '../../interfaces/Podcast';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private readonly PODCAST_CACHE_KEY = 'podcasts-cache';
  private readonly PODCAST_DETAIL_CACHE_KEY = 'podcasts-detail-cache';
  private readonly CACHE_TIME = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient, private stateService: StateService) {}

  /* Here is the explanation for the code above:
    1. We add the isLoading state to show the user that the app is fetching the data.
    2. We check if there are any podcasts in the cache. If there are, we return them as an observable.
    3. If there are no podcasts in the cache, we make a request to the API to get them and we return them as an observable.
    4. If the request fails, we log the error and return it.
    5. Finally, we update the state with the loading status. 
  */
  getPodcasts(): Observable<any> {
    this.stateService.updateState({ isLoading: true });
    const cachePodcasts = this.getPodcastsFromCache();
    if (cachePodcasts.length) {
      return new Observable((observer) => {
        observer.next(cachePodcasts);
        this.stateService.updateState({ isLoading: false });
        observer.complete();
      });
    } else {
      return this.http
        .get(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        )
        .pipe(
          map((data: any) => {
            const parsedPodcastsData: Podcast[] = data.feed?.entry?.map(
              (podcast: any) => {
                const parsedPodcast: Podcast = {
                  id: podcast.id.attributes['im:id'],
                  title: podcast['im:name'].label,
                  description: podcast.summary.label,
                  image: podcast['im:image'].slice(-1)?.[0].label,
                  author: podcast['im:artist'].label,
                };
                return parsedPodcast;
              }
            );
            this.setPodcastsCache(parsedPodcastsData);

            return parsedPodcastsData;
          }),
          catchError((err) => {
            console.error(err);
            return err;
          }),
          finalize(() => this.stateService.updateState({ isLoading: false }))
        );
    }
  }

  /* Here is the explanation for the code above:
    1. We add the isLoading state to show the user that the app is fetching the data.
    2. We try to find the podcast in the cache.
    3. If the podcast is found in the cache, we return the podcast from the cache.
    4. If the podcast is not found in the cache, we fetch the podcast from the API.
    5. We parse the data from the API.
    6. We update the cache with the new podcast.
    7. We return the podcast from the API.
    8. If the API throws an error, we catch it and return it.
    9. We update the state to remove the isLoading state. 
  */
  getPodcastDetail(id: string): Observable<any> {
    this.stateService.updateState({ isLoading: true });
    const cachePodcast = this.getPodcastFromCache(id);
    if (cachePodcast?.id) {
      return new Observable((observer) => {
        observer.next(cachePodcast);
        this.stateService.updateState({ isLoading: false });
        observer.complete();
      });
    } else {
      const podcastUrl = `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=1000`;
      return this.http
        .get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(podcastUrl)}`
        )
        .pipe(
          map((data: any) => {
            if (data.status.http_code !== 200) {
              throw new Error('Error fetching podcast');
            }
            const contents = JSON.parse(data.contents);

            const oldPodcast =
              this.stateService.getData('data')?.selectedPodcast ??
              ({} as Podcast);

            const parsedPodcastData: Podcast = {
              ...oldPodcast,
              episodes: contents.results.slice(1).map((episode: any) => {
                const durationDate = new Date(0, 0, 0, 0, 0, 0);
                durationDate.setMilliseconds(episode.trackTimeMillis);
                const parsedEpisode = {
                  id: episode.trackId,
                  title: episode.trackName,
                  audioUrl: episode.previewUrl,
                  description: episode.description,
                  duration: durationDate,
                  published: episode.releaseDate,
                  image: episode.artworkUrl600,
                  podcastId: episode.collectionId,
                };
                return parsedEpisode;
              }),
            };
            this.setPodcastCache(id, parsedPodcastData);
            return parsedPodcastData;
          }),
          catchError((err) => {
            console.error(err);
            return err;
          }),
          finalize(() => this.stateService.updateState({ isLoading: false }))
        );
    }
  }

  /* Here is the explanation for the code above:
    1. Inside the setSelectedPodcast() method, we call the updateState() method from the state service. 
    2. We pass to this method an object with the data property. 
    3. We grab the data property from the state service and we spread it into the new object.
    4. We set the selectedPodcast property in the data object to the podcast we passed as an argument to the method. 
  */
  setSelectedPodcast(podcast: Podcast) {
    this.stateService.updateState({
      data: {
        ...this.stateService.getData('data'),
        selectedPodcast: podcast,
      },
    });
  }

  /* Here is the explanation for the code above:
    1. We check if there is a cache for the podcasts in the local storage.
    2. If there is a cache, then we check if it is still valid, by comparing the current timestamp with the expire property in the cache.
    3. If it is valid, we just return the data from the cache.
    4. If it is not valid, we return an empty array. 
  */
  private getPodcastsFromCache(): Podcast[] {
    const cachePodcast = JSON.parse(
      localStorage.getItem(this.getPodcastsCacheKey()) as string
    );
    if (cachePodcast && cachePodcast?.expire > Date.now()) {
      return cachePodcast.data;
    }
    return [] as Podcast[];
  }

  /* Here is the explanation for the code above:
    1. First, we are creating a private getPodcastFromCache method that takes an id as an argument.
    2. Then, we are getting the podcast from the cache by the given id.
    3. Next, we are checking if the podcast exists in the cache and if the cache is not expired yet.
    4. If the podcast exists and not expired, we are returning the podcast from the cache.
    5. If the podcast not exists or expired, we are returning an empty podcast object. 
  */
  private getPodcastFromCache(id: string): Podcast {
    const cachePodcast = JSON.parse(
      localStorage.getItem(this.getPodcastCacheKey(id)) as string
    );
    if (cachePodcast && cachePodcast?.expire > Date.now()) {
      return cachePodcast.data;
    }
    return {} as Podcast;
  }

  /* Here is the explanation for the code above:
    1. The setPodcastCache method receives a podcast id and a podcast object as parameters.
    2. It calculates the expire date by adding the current time to the cache time.
    3. It creates a cache data object with the expire date and the podcast data.
    4. It stores the cache data object as a string in the local storage using the podcast id as a key. 
  */
  private setPodcastCache(id: string, podcast: Podcast) {
    const expire = Date.now() + this.CACHE_TIME;
    const cacheData = {
      expire,
      data: podcast,
    };
    localStorage.setItem(
      this.getPodcastCacheKey(id),
      JSON.stringify(cacheData as any)
    );
  }

  /* Here is the explanation for the code above:
    1. We first determine the cache expiration time by adding the current timestamp with the cache time we set earlier.
    2. We then create a cacheData object that contains the expire timestamp and the actual data to be stored.
    3. We then use localStorage.setItem() to store the cacheData object as a string.
    4. Finally, we set the cache data in localStorage. We can’t set objects in localStorage so we need to stringify the cacheData object.
  */
  private setPodcastsCache(podcasts: Podcast[]) {
    const expire = Date.now() + this.CACHE_TIME;
    const cacheData = {
      expire,
      data: podcasts,
    };
    localStorage.setItem(
      this.getPodcastsCacheKey(),
      JSON.stringify(cacheData as any)
    );
  }

  /* Here is the explanation for the code above:
    1. We create a getPodcastsCacheKey() method that returns the cache key we will use to store the podcasts data.
    2. We then create a getPodcasts() method that will be responsible for fetching the podcasts data from the network.
    3. We then implement a getCachedPodcasts() method that will be responsible for fetching the podcasts data from the cache.
    4. We then implement a getPodcasts() method that will fetch the podcasts data either from the cache or from the network.
    5. We then create a getPodcast() method that will be responsible for fetching an individual podcast by its id.
    6. We then create a getEpisodes() method that will be responsible for fetching the episodes of a podcast by its id. 
  */
  private getPodcastsCacheKey() {
    return `${this.PODCAST_CACHE_KEY}`;
  }

  /* Here is the explanation for the code above:
    1. We first create a class property that we will use as a prefix for all cache keys. 
    This is a good pattern to follow because it allows us to easily change the prefix later if needed.
    2. We then create a method that returns the cache key for a podcast detail. 
    It uses the prefix and the podcast id to create a unique key. 
  */
  private getPodcastCacheKey(id: string) {
    return `${this.PODCAST_DETAIL_CACHE_KEY}-${id}`;
  }
}
