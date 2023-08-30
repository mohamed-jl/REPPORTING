import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleformComponent } from './submoduleform.component';

describe('SubmoduleformComponent', () => {
  let component: SubmoduleformComponent;
  let fixture: ComponentFixture<SubmoduleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmoduleformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmoduleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
