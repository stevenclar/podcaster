import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Episode from 'src/app/core/interfaces/Episodes';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent {
  public episode!: Episode;
  public rowHtmlContent!: SafeHtml;

  constructor(
    private stateService: StateService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.stateService.state$.subscribe((state) => {
      this.episode = state.data?.selectedEpisode as Episode;
      this.rowHtmlContent = this.sanitizer.bypassSecurityTrustHtml(
        this.episode?.description
      );
    });
  }
}
