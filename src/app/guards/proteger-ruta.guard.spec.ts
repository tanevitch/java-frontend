import { TestBed } from '@angular/core/testing';

import { ProtegerRutaGuard } from './proteger-ruta.guard';

describe('ProtegerRutaGuard', () => {
  let guard: ProtegerRutaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerRutaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
