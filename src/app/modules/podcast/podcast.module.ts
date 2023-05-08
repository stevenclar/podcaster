import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PodcastComponent } from './podcast.component';
import { PodcastDetailCardComponent } from './components/podcast-detail-card/podcast-detail-card.component';

const routes: Routes = [
  {
    path: ':id',
    component: PodcastComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/modules/podcast/modules/podcast-detail/podcast-detail.module').then(
            (m) => m.PodcastDetailModule
          ),
      },
      {
        path: 'episode/:episodeId',
        loadChildren: () =>
          import('src/app/modules/podcast/modules/episode-detail/episode-detail.module').then(
            (m) => m.EpisodeDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [PodcastComponent, PodcastDetailCardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class PodcastModule {}
