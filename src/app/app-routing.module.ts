import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'podcast',
    loadChildren: () =>
      import('src/app/modules/podcast/podcast.module').then((m) => m.PodcastModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
