import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewExtendedDataComponent } from './review-extended-data.component';

describe('ReviewExtendedDataComponent', () => {
  let component: ReviewExtendedDataComponent;
  let fixture: ComponentFixture<ReviewExtendedDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewExtendedDataComponent]
    });
    fixture = TestBed.createComponent(ReviewExtendedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
