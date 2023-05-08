import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastDetailComponent } from './podcast-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PodcastDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PodcastDetailComponent,
      },
    ]),
  ],
})
export class PodcastDetailModule {}
