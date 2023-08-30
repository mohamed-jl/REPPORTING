import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFunctionComponent } from './order-function.component';

describe('OrderFunctionComponent', () => {
  let component: OrderFunctionComponent;
  let fixture: ComponentFixture<OrderFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFunctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
