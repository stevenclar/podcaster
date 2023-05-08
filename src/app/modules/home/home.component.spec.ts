import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, FormsModule],
      declarations: [HomeComponent, PodcastCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.podcasts = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component['podcastService'], 'getPodcasts');
    expect(component).toBeTruthy();
  });
});
