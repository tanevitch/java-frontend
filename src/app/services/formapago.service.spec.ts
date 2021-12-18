import { TestBed } from '@angular/core/testing';

import { FormapagoService } from './formapago.service';

describe('FormapagoService', () => {
  let service: FormapagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormapagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
