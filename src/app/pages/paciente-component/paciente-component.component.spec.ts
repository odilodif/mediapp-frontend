import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteComponentComponent } from './paciente-component.component';

describe('PacienteComponentComponent', () => {
  let component: PacienteComponentComponent;
  let fixture: ComponentFixture<PacienteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacienteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
