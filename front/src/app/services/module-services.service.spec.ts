import { TestBed } from '@angular/core/testing';

import { ModuleServicesService } from './module-services.service';

describe('ModuleServicesService', () => {
  let service: ModuleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
