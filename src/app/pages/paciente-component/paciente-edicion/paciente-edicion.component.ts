import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrl: './paciente-edicion.component.css'
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup
  constructor(){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
    });
  }

  operar(){
    
  }
}
