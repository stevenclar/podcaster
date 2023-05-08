import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeDetailComponent } from './episode-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EpisodeDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EpisodeDetailComponent,
      },
    ]),
  ]
})
export class EpisodeDetailModule { }
