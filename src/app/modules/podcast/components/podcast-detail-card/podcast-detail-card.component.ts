import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Podcast from 'src/app/core/interfaces/Podcast';

@Component({
  selector: 'app-podcast-detail-card',
  templateUrl: './podcast-detail-card.component.html',
  styleUrls: ['./podcast-detail-card.component.scss'],
})
export class PodcastDetailCardComponent {
  @Input() podcast!: Podcast;

  constructor(private router: Router) {}

  goToPodcastDetails(): void {
    this.router.navigate(['/podcast', this.podcast.id]);
  }
}
