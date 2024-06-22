import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PacienteServiceService } from '../../service/paciente-service.service';
import { Paciente } from '../../model/paciente';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-paciente-component',
  templateUrl: './paciente-component.component.html',
  styleUrl: './paciente-component.component.css'
})
export class PacienteComponentComponent implements OnInit {
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'dni', 'direccion', 'telefono', 'mail', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private pacienteService: PacienteServiceService) {

  }

  ngOnInit(): void {
    this.pacienteService.pacienteCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })


    this.pacienteService.listarPacientes().subscribe((data) => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idPaciente: number) {
    this.pacienteService.eliminar(idPaciente).subscribe(()=>{
      this.pacienteService.listarPacientes().subscribe((data)=>{
        this.pacienteService.pacienteCambio.next(data)
      });
    })
  }

}
