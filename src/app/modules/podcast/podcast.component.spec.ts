import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastComponent } from './podcast.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PodcastDetailCardComponent } from './components/podcast-detail-card/podcast-detail-card.component';
import { StateService } from 'src/app/core/services/state/state.service';

describe('PodcastComponent', () => {
  let component: PodcastComponent;
  let fixture: ComponentFixture<PodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule],
      declarations: [PodcastComponent, PodcastDetailCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of([{ id: 1 }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
