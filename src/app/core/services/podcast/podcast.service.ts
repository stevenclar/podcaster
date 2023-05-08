import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import Podcast from '../../interfaces/Podcast';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private readonly CACHE_KEY = 'podcasts-cache';
  private readonly CACHE_TIME = 24 * 60 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private router: Router,
    private stateService: StateService
  ) {}

  getPodcasts(): Observable<any> {
    const cachePodcasts = JSON.parse(
      localStorage.getItem(this.CACHE_KEY) as string
    );
    if (cachePodcasts && cachePodcasts?.expire > Date.now()) {
      return new Observable((observer) => {
        observer.next(cachePodcasts.data);
        observer.complete();
      });
    } else {
      return this.http
        .get(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        )
        .pipe(
          map((data: any) => {
            const expire = Date.now() + this.CACHE_TIME;
            const parsedData: Podcast[] =
              data.feed?.entry?.map((podcast: any) => {
                const parsedPodcast: Podcast = {
                  id: podcast.id.attributes['im:id'],
                  title: podcast['im:name'].label,
                  description: podcast.summary.label,
                  image: podcast['im:image'].slice(-1)?.[0].label,
                  author: podcast['im:artist'].label,
                };
                return parsedPodcast;
              }) ?? data;
            const cacheData = {
              expire,
              data: parsedData,
            };
            localStorage.setItem(
              this.CACHE_KEY,
              JSON.stringify(cacheData as any)
            );

            return parsedData;
          })
        );
    }
  }

  getPodcast(id: string): Observable<any> {
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

          const parsedData: Podcast = {
            ...oldPodcast,
            episodes: contents.results.slice(1).map((episode: any) => {
              const durationDate = new Date(0,0,0,0,0,0);
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
          this.stateService.updateState({
            data: {
              selectedPodcast: parsedData,
            },
          });
        })
      );
  }

  setSelectedPodcast(podcast: Podcast) {
    this.stateService.updateState({
      data: {
        selectedPodcast: podcast,
      },
    });
    this.router.navigate(['/podcast', podcast.id]);
  }
}