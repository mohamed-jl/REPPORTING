import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategroupformComponent } from './updategroupform.component';

describe('UpdategroupformComponent', () => {
  let component: UpdategroupformComponent;
  let fixture: ComponentFixture<UpdategroupformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategroupformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdategroupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
