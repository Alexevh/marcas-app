import { TestBed } from '@angular/core/testing';

import { UiserviceService } from './uiservice.service';

describe('UiserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiserviceService = TestBed.get(UiserviceService);
    expect(service).toBeTruthy();
  });
});
