import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsMovieComponent } from './chips-movie.component';

describe('ChipsMovieComponent', () => {
  let component: ChipsMovieComponent;
  let fixture: ComponentFixture<ChipsMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsMovieComponent]
    });
    fixture = TestBed.createComponent(ChipsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
