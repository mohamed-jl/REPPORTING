import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefunctionmodalComponent } from './updatefunctionmodal.component';

describe('UpdatefunctionmodalComponent', () => {
  let component: UpdatefunctionmodalComponent;
  let fixture: ComponentFixture<UpdatefunctionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefunctionmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatefunctionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
