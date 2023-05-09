import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  podcasts: Podcast[] = [];
  searchValue: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private podcastService: PodcastService) {}

  ngOnInit(): void {
    this.podcastService
      .getPodcasts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((podcasts) => {
        this.podcasts = podcasts;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
