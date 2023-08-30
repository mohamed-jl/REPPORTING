import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleformComponent } from './moduleform.component';

describe('ModuleformComponent', () => {
  let component: ModuleformComponent;
  let fixture: ComponentFixture<ModuleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
