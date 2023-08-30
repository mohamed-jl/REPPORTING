import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserRapportsComponent } from './list-user-rapports.component';

describe('ListUserRapportsComponent', () => {
  let component: ListUserRapportsComponent;
  let fixture: ComponentFixture<ListUserRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserRapportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
