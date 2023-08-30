import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionChartsComponent } from './function-charts.component';

describe('FunctionChartsComponent', () => {
  let component: FunctionChartsComponent;
  let fixture: ComponentFixture<FunctionChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
