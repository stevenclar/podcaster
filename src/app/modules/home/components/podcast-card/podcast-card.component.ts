import { Component, Input } from '@angular/core';
import Podcast from 'src/app/core/interfaces/Podcast';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss'],
})
export class PodcastCardComponent {
  @Input() podcast!: Podcast;

  constructor() {}
}
