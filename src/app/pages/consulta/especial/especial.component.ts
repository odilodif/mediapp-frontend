import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Paciente } from '../../../model/paciente';
import { Medico } from '../../../model/medico';
import { Especialidad } from '../../../model/especialidad';
import { Examen } from '../../../model/examen';
import { DetalleConsulta } from '../../../model/detalleConsulta';
import { map, Observable } from 'rxjs';
import { PacienteServiceService } from '../../../service/paciente-service.service';
import { EspecialidadService } from '../../../service/especialidad.service';
import { MedicoService } from '../../../service/medico.service';
import { ExamenService } from '../../../service/examen.service';
import { ConsultaService } from '../../../service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from '../../../model/consulta';
import { ConsultaListaExamenDTO } from '../../../dto/consultaListaExamenTDO';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrl: './especial.component.css'
})
export class EspecialComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];//Definicion de lista de Pacientes
  especialidades: Especialidad[];//Definicion de lista de Especialidades
  medicos: Medico[];//Definicion de lista de Medicos  
  examenes: Examen[];//Definicion de lista de Examenes

  detalleConsulta: DetalleConsulta[] = [];
  examenesSelecciondos: Examen[] = [];

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  fechaSeleccionada: Date = new Date();
  maxfecha: Date = new Date();

  //Utiles para el autocontrol
  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacientesFiltrados: Observable<any[]>
  medicosFiltrados: Observable<any[]>

  constructor(
    private pacienteService: PacienteServiceService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'especialidad': new FormControl(),
      'medico': this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });

    this.listarPaciente();
    this.listarEspecialidad();
    this.listarMedico();
    this.listarExamen();

    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
    this.medicosFiltrados = this.myControlMedico.valueChanges.pipe(map(val => this.filtrarMedicos(val)))


  }

  filtrarPacientes(val: any) {
    console.log(val);
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.toLowerCase().includes(val.dni.toLowerCase()));
    } else {

      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.toLowerCase().includes(val.toLowerCase()))

    }

  }


  filtrarMedicos(val: any) {
    console.log(val);
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    } else {

      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()))
    }

  }


  mostarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }


  mostarMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarPaciente() {
    this.pacienteService.listarPacientes().subscribe(data => {
      this.pacientes = data;
    })
  }
  listarEspecialidad() {
    this.especialidadService.listarEspecialidad().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMedico() {
    this.medicoService.listarMedico().subscribe(data => {
      this.medicos = data;
    });
  }
  listarExamen() {
    this.examenService.listarExamen().subscribe(data => {
      this.examenes = data;
    });
  }



  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  seleccionarMedico(e: any) {
    this.medicoSeleccionado = e.option.value;
  }



  agregar() {    
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = '';
      this.tratamiento = '';
    } else {
      this.mensaje = `Debe agreagar un diagnostico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 })
    }


  }

  agregarExamen() {
   
    if (this.examenSeleccionado) {
      console.log('EXAMEN:: '+this.examenSeleccionado.nombre)
      let cont = 0;
      for (let i = 0; i < this.examenesSelecciondos.length; i++) {
        let examen = this.examenesSelecciondos[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
        if (cont > 0) {
          this.mensaje = `El examen se encuentra en la lista`;
          this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 })
        }
        else {
          this.examenesSelecciondos.push(this.examenSeleccionado);
        }

      
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 })
    }
  }



  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null)
  }

  aceptar() {
    let consulta = new Consulta();
    consulta.especialidad = this.form.value['especialidad'];
    consulta.medico = this.form.value['medico'];
    consulta.paciente = this.form.value['paciente'];

    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha = localISOTime;
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO;
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSelecciondos;

    this.consultaService.registrar(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Regristrod de Consulta Exitoso", "Aviso", { duration: 500 });
      console.log(`Regristro de Consulta Exitoso `)
      console.log(consultaListaExamenDTO);
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSelecciondos = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = {} as Paciente;
    this.especialidadSeleccionada = {} as Especialidad;
    this.medicoSeleccionado = {} as Medico;
    this.examenSeleccionado = {} as Examen;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }
  removerDiagnostico(i: number) {
    this.detalleConsulta.splice(i, 1);
  }
  removerExamen(i: number) {
    this.examenesSelecciondos.splice(i,1);
  }

}
