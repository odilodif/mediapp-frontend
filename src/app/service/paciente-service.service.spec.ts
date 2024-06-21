import { TestBed } from '@angular/core/testing';

import { PacienteServiceService } from './paciente-service.service';

describe('PacienteServiceService', () => {
  let service: PacienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
