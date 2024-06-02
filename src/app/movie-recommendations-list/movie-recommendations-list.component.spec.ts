import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommendationsListComponent } from './movie-recommendations-list.component';

describe('MovieRecommendationsListComponent', () => {
  let component: MovieRecommendationsListComponent;
  let fixture: ComponentFixture<MovieRecommendationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieRecommendationsListComponent]
    });
    fixture = TestBed.createComponent(MovieRecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
