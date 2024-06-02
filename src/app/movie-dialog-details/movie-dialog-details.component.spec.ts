import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDialogDetailsComponent } from './movie-dialog-details.component';

describe('MovieDialogDetailsComponent', () => {
  let component: MovieDialogDetailsComponent;
  let fixture: ComponentFixture<MovieDialogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDialogDetailsComponent]
    });
    fixture = TestBed.createComponent(MovieDialogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
