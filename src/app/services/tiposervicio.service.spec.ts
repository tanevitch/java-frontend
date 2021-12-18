import { TestBed } from '@angular/core/testing';

import { TipoServicioService } from './tiposervicio.service';

describe('TipoServicioService', () => {
  let service: TipoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
