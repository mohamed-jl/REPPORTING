import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUserChartsComponent } from './order-user-charts.component';

describe('OrderUserChartsComponent', () => {
  let component: OrderUserChartsComponent;
  let fixture: ComponentFixture<OrderUserChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUserChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUserChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
