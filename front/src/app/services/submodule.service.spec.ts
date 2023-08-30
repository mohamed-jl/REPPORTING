import { TestBed } from '@angular/core/testing';

import { SubmoduleService } from './submodule.service';

describe('SubmoduleService', () => {
  let service: SubmoduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmoduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
