import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionformComponent } from './fonctionform.component';

describe('FonctionformComponent', () => {
  let component: FonctionformComponent;
  let fixture: ComponentFixture<FonctionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
