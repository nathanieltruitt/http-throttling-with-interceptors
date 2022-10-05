import { TestBed } from '@angular/core/testing';

import { ApiThrottleService } from './api-throttle.service';

describe('ApiThrottleService', () => {
  let service: ApiThrottleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiThrottleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
