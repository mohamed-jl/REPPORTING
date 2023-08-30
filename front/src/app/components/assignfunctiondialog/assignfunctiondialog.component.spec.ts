import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignfunctiondialogComponent } from './assignfunctiondialog.component';

describe('AssignfunctiondialogComponent', () => {
  let component: AssignfunctiondialogComponent;
  let fixture: ComponentFixture<AssignfunctiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignfunctiondialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignfunctiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
