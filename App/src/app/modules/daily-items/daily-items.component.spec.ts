import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyItemsComponent } from './daily-items.component';

describe('DailyItemsComponent', () => {
  let component: DailyItemsComponent;
  let fixture: ComponentFixture<DailyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
