import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDatesComponent } from './compare-dates.component';

describe('CompareDatesComponent', () => {
  let component: CompareDatesComponent;
  let fixture: ComponentFixture<CompareDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
