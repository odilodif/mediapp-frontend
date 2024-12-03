import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PacienteServiceService } from '../../../service/paciente-service.service';
import { Paciente } from '../../../model/paciente';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-paciente-edicion',
    templateUrl: './paciente-edicion.component.html',
    styleUrl: './paciente-edicion.component.css',
    standalone: false
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;
  constructor(private pacienteService: PacienteServiceService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      'idPaciente': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'mail': new FormControl(''),
      'direccion': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }

  operar() {
    let paciente = new Paciente();
    paciente = this.form.value;
    /* paciente.apellidos = this.form.value['apellidos'];
     paciente.dni = this.form.value['dni'];
     paciente.telefono = this.form.value['telefono'];
     paciente.mail = this.form.value['mail'];
     paciente.direccion = this.form.value['direccion'];*/
    //console.log(paciente)
    if (this.edicion) {
      //console.log(paciente)
     this.pacienteService.modificar(paciente).subscribe(()=>{
      this.pacienteService.listarPacientes().subscribe((data)=>{
        this.pacienteService.pacienteCambio.next(data)
        this.pacienteService.mensajeCambio.next('SE MODIFICO!!!')
      });
     });
    
    } else {

      this.pacienteService.registrar(paciente).subscribe(()=>{
        this.pacienteService.listarPacientes().subscribe((data)=>{
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('SE CREO NUEVO REGISTRO!!!')
        });
      });
    }

    this.router.navigate(['paciente'])

  }

  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id).subscribe((data) => {
       
        this.form = new FormGroup({
          'idPaciente': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'mail': new FormControl(data.mail),
          'direccion': new FormControl(data.direccion)
        });
      });
    }
  }
}
