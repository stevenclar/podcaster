import { Component, Input } from '@angular/core';
import Podcast from 'src/app/core/interfaces/Podcast';

@Component({
  selector: 'app-podcast-detail-card',
  templateUrl: './podcast-detail-card.component.html',
  styleUrls: ['./podcast-detail-card.component.scss']
})
export class PodcastDetailCardComponent {
  @Input() podcast!: Podcast;

}
