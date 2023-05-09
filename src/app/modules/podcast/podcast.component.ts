import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent implements OnInit, OnDestroy {
  id!: string;
  podcast!: Podcast;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private podcastService: PodcastService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
      this.podcastService
        .getPodcastDetail(this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((podcast) => {
          this.podcastService.setSelectedPodcast(podcast);
        });
      this.stateService.state$.subscribe((state) => {
        this.podcast = state.data?.selectedPodcast as Podcast;
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
