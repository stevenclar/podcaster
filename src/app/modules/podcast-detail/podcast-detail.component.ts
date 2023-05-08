import { Component } from '@angular/core';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss']
})
export class PodcastDetailComponent {
  public podcast!: Podcast
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.state$.subscribe((state) => {
      this.podcast = state.data?.selectedPodcast as Podcast;
    });
  }
}
