import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultaService } from '../../service/consulta.service';
import { FiltroConsultaDTO } from '../../dto/filtroConsultaDTO';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from '../../model/consulta';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog

  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });
  }

  buscar() {
    let filtro = new FiltroConsultaDTO(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    /**
     
      {
        dni:'',
        nombreCompleto: xxxxxx,
        fecha:''
      }
    
    
      {   
        nombreCompleto: xxxxxx   
      }
     * 
     */


    if (filtro.fechaConsulta) {
      delete filtro.dni;
      delete filtro.nombreCompleto;

      this.consultaService.buscar(filtro).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    } else {
      delete filtro.fechaConsulta;
      if (filtro.dni?.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto?.length === 0) {
        delete filtro.nombreCompleto;
      }

      this.consultaService.buscar(filtro).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }
  }

  verDetalle(consulta: Consulta) {
    this.dialog.open(BuscarDialogoComponent, {
      data: consulta
    });
  }

}
