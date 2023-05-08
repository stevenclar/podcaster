import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Episode from 'src/app/core/interfaces/Episodes';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss'],
})
export class PodcastDetailComponent {
  public podcast!: Podcast;
  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.stateService.state$.subscribe((state) => {
      this.podcast = state.data?.selectedPodcast as Podcast;
    });
  }

  onEpisodeClick(episode: Episode) {
    this.stateService.updateState({
      data: {
        ...this.stateService.getData('data'),
        selectedEpisode: episode,
      },
    });
    this.router.navigate(['/podcast', this.podcast.id, 'episode', episode.id]);
  }
}
