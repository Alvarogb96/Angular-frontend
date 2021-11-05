import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { saveAs } from 'file-saver';
import { MessageService } from 'primeng/api';
import { constantes } from 'src/app/core/constantes';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.scss']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input() public empleado;
  @Output() public cerrarDetalle = new EventEmitter();


  cols: any[];
  first = 0;
  rows = 5;
  totalRecordsTest: any;
  totalRecordsVacuna: any;

  mostrar:boolean;

  vacunas = [];
  tests = [];

  formModel = this.fb.group({
    nombre:[null,[]],
    apellido1 : [null,[]],
    apellido2: [null,[]],
    nif:[null, []],
    email:[null, []],
    fechaAlta: [null, []],
    fechaNac: [null, []],
  });
  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.mostrar = true;
    this.obtenerVacunasEmpleado();
    this.obtenerTestEmpleado();
  }


  aceptar() {
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
  }

  cancel(){
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
  }

  obtenerVacunasEmpleado(){
    this.connectionService.getVacunasByIdEmpleado(this.empleado.id_usuario).subscribe((res =>{
      if(res.vacunas != undefined && res.vacunas != null){
        this.vacunas = res.vacunas;
        for(var vacuna of this.vacunas){
          if(vacuna.pauta_completa === 0){
            vacuna.pauta_completa = 'No';
          } else {
            vacuna.pauta_completa = 'Sí';
          }
          vacuna.fecha_vacuna = this.utilsService.getDateStringSinHora(vacuna.fecha_vacuna);
        }
        this.paginacionVacuna(this.vacunas);
    }
  }), (err =>{
  }));
    
  }

  obtenerTestEmpleado(){
    this.connectionService.getTestsByIdEmpleado(this.empleado.id_usuario).subscribe((res =>{
      if(res.tests != undefined && res.tests != null){
        this.tests = res.tests;
        for(var test of this.tests){
          test.fecha_test = this.utilsService.getDateStringSinHora(test.fecha_test);
        }
        this.paginacionTest(this.tests);
    }
  }), (err =>{
  }));
    
  }

  downloadTest(test) {
    if (test.nombre_archivo !== undefined && test.nombre_archivo !== null && test.nombre_archivo !== '') {
      var nombreArchivo = test.nombre_archivo;
      this.connectionService.downloadTest(nombreArchivo).toPromise()
        .then(blob => {
          saveAs(blob, nombreArchivo);
        })
        .catch(err => {
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_ERROR_ARCHIVO_TEST_HEADER, 
          detail:constantes.MENSAJE_ERROR_ARCHIVO_TEST, life:7000});
        });
    } else {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_ERROR_ARCHIVO_TEST_HEADER, 
          detail:constantes.MENSAJE_ERROR_ARCHIVO_TEST, life:7000});
    }
  }

  downloadVacuna(vacuna) {
    if (vacuna.nombre_archivo !== undefined && vacuna.nombre_archivo !== null && vacuna.nombre_archivo !== '') {
      var nombreArchivo = vacuna.nombre_archivo;
      this.connectionService.downloadVacuna(nombreArchivo).toPromise()
        .then(blob => {
          saveAs(blob, nombreArchivo);
        })
        .catch(err => {
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_ERROR_ARCHIVO_VACUNA_HEADER, 
          detail:constantes.MENSAJE_ERROR_ARCHIVO_VACUNA, life:7000});
        });
    } else {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_ERROR_ARCHIVO_VACUNA_HEADER, 
          detail:constantes.MENSAJE_ERROR_ARCHIVO_VACUNA, life:7000});
    }
  }


  //Paginación Tests
  paginacionTest(list){
    this.totalRecordsTest = list.length;
  }

  paginacionVacuna(list){
    this.totalRecordsVacuna = list.length;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.tests ? this.first === (this.tests.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.tests ? this.first === 0 : true;
  }
}
