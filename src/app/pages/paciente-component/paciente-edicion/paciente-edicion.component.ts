import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PacienteServiceService } from '../../../service/paciente-service.service';
import { Paciente } from '../../../model/paciente';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrl: './paciente-edicion.component.css'
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;

  constructor(private pacienteService: PacienteServiceService) {

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'mail': new FormControl(''),
      'direccion': new FormControl(''),
    });
  }

  operar() {

    let paciente = new Paciente();
    paciente= this.form.value;
   /* paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.telefono = this.form.value['telefono'];
    paciente.mail = this.form.value['mail'];
    paciente.direccion = this.form.value['direccion'];*/
    console.log(paciente)
    this.pacienteService.registrar(paciente).subscribe();
  }
}
