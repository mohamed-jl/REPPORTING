import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesubmodulemodalComponent } from './updatesubmodulemodal.component';

describe('UpdatesubmodulemodalComponent', () => {
  let component: UpdatesubmodulemodalComponent;
  let fixture: ComponentFixture<UpdatesubmodulemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesubmodulemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesubmodulemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
