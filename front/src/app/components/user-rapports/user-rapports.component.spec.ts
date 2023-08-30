import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRapportsComponent } from './user-rapports.component';

describe('UserRapportsComponent', () => {
  let component: UserRapportsComponent;
  let fixture: ComponentFixture<UserRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRapportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
