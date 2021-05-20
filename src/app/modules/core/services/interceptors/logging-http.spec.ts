import { TestBed } from '@angular/core/testing';

import { LoggingHttpInterceptor } from './logging-http-interceptor';

describe('LoggingHttpInterceptor', () => {
  let service: LoggingHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingHttpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
