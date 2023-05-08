import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Podcast from '../interfaces/Podcast';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private readonly CACHE_KEY = 'podcasts-cache';
  private readonly CACHE_TIME = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) {}

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
            const parsedData: Podcast[] = data.feed?.entry?.map(
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
            ) ?? data;
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
}
