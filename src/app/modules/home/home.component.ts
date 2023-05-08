import { Component, OnInit } from '@angular/core';
import Podcast from 'src/app/core/interfaces/Podcast';
import { PodcastService } from 'src/app/core/services/podcast/podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  podcasts: Podcast[] = [];
  searchValue: string = '';

  constructor(private podcastService: PodcastService) {}

  ngOnInit(): void {
    this.podcastService.getPodcasts().subscribe((podcasts) => {
      this.podcasts = podcasts;
    });
  }
}
