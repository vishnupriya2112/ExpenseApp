import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyItemsComponent } from './yearly-items.component';

describe('YearlyItemsComponent', () => {
  let component: YearlyItemsComponent;
  let fixture: ComponentFixture<YearlyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
