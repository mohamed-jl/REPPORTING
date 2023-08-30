import { TestBed } from '@angular/core/testing';

import { GroupModuleService } from './group-module.service';

describe('GroupModuleService', () => {
  let service: GroupModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
