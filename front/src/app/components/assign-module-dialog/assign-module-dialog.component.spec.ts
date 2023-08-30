import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignModuleDialogComponent } from './assign-module-dialog.component';

describe('AssignModuleDialogComponent', () => {
  let component: AssignModuleDialogComponent;
  let fixture: ComponentFixture<AssignModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignModuleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
