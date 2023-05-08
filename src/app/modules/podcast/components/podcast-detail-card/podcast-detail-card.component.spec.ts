import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastDetailCardComponent } from './podcast-detail-card.component';

describe('PodcastDetailCardComponent', () => {
  let component: PodcastDetailCardComponent;
  let fixture: ComponentFixture<PodcastDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
