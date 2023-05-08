import { Component, Input } from '@angular/core';
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
  ) {}

  goToPodcastDetail(podcast: Podcast) {
    this.podcastService.setSelectedPodcast(podcast);
  }
}
