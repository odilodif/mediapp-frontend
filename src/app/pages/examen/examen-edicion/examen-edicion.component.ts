import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExamenService } from '../../../service/examen.service';
import { Examen } from '../../../model/examen';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrl: './examen-edicion.component.css'
})
export class ExamenEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private examenService: ExamenService, private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idExamen': new FormControl(0),
      'descripcion': new FormControl(''),
      'nombre': new FormControl('')     
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }


  operar() {
    let examen = new Examen();
    examen = this.form.value;    
    if (this.edicion) {
      //console.log(examen)
     this.examenService.modificar(examen).subscribe(()=>{
      this.examenService.listarExamen().subscribe((data)=>{
        this.examenService.examenCambio.next(data)
        this.examenService.mensajeCambio.next('SE MODIFICO!!!')
      });
     });
    
    } else {

      this.examenService.registrar(examen).subscribe(()=>{
        this.examenService.listarExamen().subscribe((data)=>{
          this.examenService.examenCambio.next(data);
          this.examenService.mensajeCambio.next('SE CREO NUEVO REGISTRO!!!')
        });
      });
    }

    this.router.navigate(['examen'])

  }

  initForm() {
    if (this.edicion) {
      this.examenService.listarPorId(this.id).subscribe((data) => {
       console.log(data)
        this.form = new FormGroup({
          'idExamen': new FormControl(data.idExamen),
          'descripcion': new FormControl(data.descripcion),
          'nombre': new FormControl(data.nombre)
          
        });
      });
    }
  }
}
