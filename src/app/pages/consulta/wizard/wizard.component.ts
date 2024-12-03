import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../../model/paciente';
import { Especialidad } from '../../../model/especialidad';
import { Medico } from '../../../model/medico';
import { Examen } from '../../../model/examen';
import { Consulta } from '../../../model/consulta';
import { DetalleConsulta } from '../../../model/detalleConsulta';
import { PacienteServiceService } from '../../../service/paciente-service.service';
import { EspecialidadService } from '../../../service/especialidad.service';
import { MedicoService } from '../../../service/medico.service';
import { ExamenService } from '../../../service/examen.service';
import { ConsultaService } from '../../../service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ConsultaListaExamenDTO } from '../../../dto/consultaListaExamenTDO';
import { MatStep, MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrl: './wizard.component.css',
    standalone: false
})
export class WizardComponent implements OnInit {

  isLinear: boolean = false;
  firstFormGroup: FormGroup;                  //Forms reactive module 
  secondFormGroup: FormGroup;                 //Forms reactive module 


  /**
   Las Listas de Pacientes,Especialidades, Medicos y Examenes 
  */
  pacientes: Paciente[];                      //Definicion de lista de Pacientes
  especialidades: Especialidad[];             //Definicion de lista de Especialidades
  medicos: Medico[];                          //Definicion de lista de Medicos  
  examenes: Examen[];                         //Definicion de lista de Examenes

  fechaSeleccionada: Date = new Date();
  maxfecha: Date = new Date();

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  detalleConsulta: DetalleConsulta[] = [];    //Lista de Detalle consulta
  examenesSelecciondos: Examen[] = [];        //Detalle examenes seleccionados


  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  pacienteSeleccionado: Paciente;
  examenSeleccionado: Examen;

  consultorios: number[] = [];
  consultorioSeleccionado: number = 0;

  @ViewChild('stepper',{static:true}) stepper: MatStepper;

  constructor(
    private formBuilder: FormBuilder,             //como tenemos mas de un FormGroup la idea es agruparlos con FormBuilder
    private snackBar: MatSnackBar,
    private pacienteService: PacienteServiceService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService

  ) {

  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firtsCtrl: ['', Validators.required],
      'pacienteSeleccionado': new FormControl(),
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.listarPaciente();
    this.listarExamen();
    this.listarMedico();
    this.listarEspecialidad();
    this.listarConsultorios();

  }

  listarConsultorios() {
    for (let i = 1; i <= 20; i++) {
      this.consultorios.push(i);
    }
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


  removerDiagnostico(i: number) {
    this.detalleConsulta.splice(i, 1);
  }

  agregarExamen() {

    if (this.examenSeleccionado) {
      console.log('EXAMEN:: ' + this.examenSeleccionado.nombre)
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

  removerExamen(i: number) {
    this.examenesSelecciondos.splice(i, 1);
  }

  seleccionarMedico(m: Medico) {

    this.medicoSeleccionado = m;
  }

  seleccionarConsultorio(c: number) {
    this.consultorioSeleccionado = c;
  }

  seleccionarPaciente(p: any) {
    this.pacienteSeleccionado = p.value;
  }

  seleccionarEspecialidad(e: any) {
    this.especialidadSeleccionada = e.value;
  }


  estadoBotonesRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === undefined || this.medicoSeleccionado === undefined || this.pacienteSeleccionado === undefined)
  }

  registrar() {
    let consulta = new Consulta();
    consulta.especialidad = this.especialidadSeleccionada;
    consulta.medico = this.medicoSeleccionado;
    consulta.paciente = this.pacienteSeleccionado;

    consulta.fecha = moment().format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;
    consulta.num_consultorio = `C${this.consultorioSeleccionado}`;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSelecciondos;

    this.consultaService.registrar(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Se registr con exito", "Aviso", { duration: 2000 })
      setTimeout(()=>{
        this.limpiarControles();
      },2000);
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
    this.stepper.reset();
  }

}
