import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss'],
})
export class PodcastCardComponent {
  @Input() podcast!: Podcast;

  constructor(
    private podcastService: PodcastService,
    private router: Router
  ) {}

  goToPodcastDetail(podcast: Podcast) {
    this.podcastService.setSelectedPodcast(podcast);
    this.router.navigate(['/podcast', podcast.id]);
  }
}
