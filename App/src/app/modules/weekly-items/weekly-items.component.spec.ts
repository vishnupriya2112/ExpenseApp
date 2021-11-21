import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyItemsComponent } from './weekly-items.component';

describe('WeeklyItemsComponent', () => {
  let component: WeeklyItemsComponent;
  let fixture: ComponentFixture<WeeklyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
