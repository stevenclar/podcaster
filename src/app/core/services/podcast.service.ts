import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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
          map((data) => {
            const expire = Date.now() + this.CACHE_TIME;
            const cacheData = {
              expire,
              data,
            };
            localStorage.setItem(
              this.CACHE_KEY,
              JSON.stringify(cacheData as any)
            );
            return data;
          })
        );
    }
  }
}
