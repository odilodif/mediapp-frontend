import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Especialidad } from '../../../model/especialidad';
import { EspecialidadService } from '../../../service/especialidad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-especialidad-edicion',
    templateUrl: './especialidad-edicion.component.html',
    styleUrl: './especialidad-edicion.component.css',
    standalone: false
})
export class EspecialidadEdicionComponent implements OnInit {
  id: number;
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private especialidadService: EspecialidadService, private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.especialidad = new Especialidad();
    this.form = new FormGroup({
      'idEspecialidad': new FormControl(0),
      'nombre': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }

  operar() {

    this.especialidad.idEspecialidad = this.form.value['idEspecialidad']
    this.especialidad.nombre = this.form.value['nombre']

    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      //BUENA [RACTICA]
      //console.log(especialidad)
      this.especialidadService.modificar(this.especialidad).pipe(switchMap(() => {
        return this.especialidadService.listarEspecialidad();
      })).subscribe(data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('SE MODIFICO')
      })

    } else {
      //PRACTICA COMUN
      this.especialidadService.registrar(this.especialidad).subscribe(() => {
        this.especialidadService.listarEspecialidad().subscribe((data) => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.mensajeCambio.next('SE CREO NUEVO REGISTRO!!!')
        });
      });
    }

    this.router.navigate(['especialidad'])
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
        this.form = new FormGroup({
          'idEspecialidad': new FormControl(id),
          'nombre': new FormControl(nombre)
        })
      }

      )
    }
  }

}
