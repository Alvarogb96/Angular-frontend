import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../core/services/connection/connection.service';
import { FormBuilder, Validators } from '@angular/forms';
import { constantes } from '../../core/constantes';
import {Test} from '../../core/models/test'
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { saveAs } from 'file-saver';
import {MessageService} from 'primeng/api';
import { TEST_BLANK } from 'src/app/core/interfaces/test';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {


  tests = [];
  cols: any[];
  first = 0;
  rows = 5;
  totalRecords: any;

  tipoTestSel = [];
  usuario: any;
  test = TEST_BLANK();
  tipoTestSelected:string;
  files;

  testEdit = TEST_BLANK();
  mostrar: boolean = false;


  formModel = this.fb.group({
    tipo:[null, [Validators.required]],
    resultado: [null, [Validators.required, Validators.maxLength(45)]],
    clinica: [null, [Validators.required, Validators.maxLength(45)]],
    fechaTest:[null, [Validators.required]],
    files:[null]
  });

  formModelEdit = this.fb.group({
    tipo:[null, [Validators.required]],
    resultado: [null, [Validators.required, Validators.maxLength(45)]],
    clinica: [null, [Validators.required, Validators.maxLength(45)]],
    fechaTest:[null, [Validators.required]],
    files:[null]
  });

  constructor(private connectionService: ConnectionService, private utilsService: UtilsService, private messageService: MessageService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTiposTest();
    this.obtenerTestEmpleado();
  }

  getTiposTest(){
    this.connectionService.getTiposTest().subscribe(res => {
      if(res != undefined){
        if(res.tiposTest != undefined){
          this.tipoTestSel = res.tiposTest;
        }
      }
    });
  }

  obtenerTestEmpleado(){
    this.connectionService.getTestsByTokenEmpleado(sessionStorage.getItem('token')).subscribe((res =>{
      if(res.tests != undefined && res.tests != null){
        this.tests = res.tests;
        for(var test of this.tests){
          test.fecha_test = this.utilsService.getDateStringSinHora(test.fecha_test);
        }
        this.paginacion(this.tests);
    }
  }), (err =>{
    if(err.status === 404){
      this.totalRecords = 0;
    }
  }));
    
  }

  addTest(){
    if(this.isValidForm()){
    var nombreArchivo = '';
    if(this.files !== undefined){
      nombreArchivo = this.files.name.slice(0, -4) +' (' +  this.utilsService.parseFechaHora(new Date()) + ').pdf';
      this.test.nombre_archivo = nombreArchivo;
    }
    this.test.id_tipo = this.tipoTestSelected;
    this.test.id_empleado = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    this.test.fecha_test = this.utilsService.changeFormatDate(this.test.fecha_test);
    this.test.fecha_creacion = this.utilsService.parseFechaHora(new Date());
    
   
    this.connectionService.saveTest(this.test).subscribe((res => {
      if (nombreArchivo !== '') {
        const formData = new FormData();
        formData.append('file', this.files, nombreArchivo);
        this.connectionService.saveFileTest(formData).subscribe((res=> {
          this.messageService.add({
            severity: 'success', summary: constantes.MENSAJE_CABECERA_AÑADIDO_CORRECTAMENTE,
            detail: constantes.MENSAJE_TEST_AÑADIDO_CORRECTAMENTE, life: 5000
          });
          this.formModel.reset();
          this.obtenerTestEmpleado();
        }), (err =>{
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
        }));
      } else {
        this.messageService.add({
          severity: 'success', summary: constantes.MENSAJE_CABECERA_AÑADIDO_CORRECTAMENTE,
          detail: constantes.MENSAJE_TEST_AÑADIDO_CORRECTAMENTE, life: 5000
        });
        this.formModel.reset();
        this.obtenerTestEmpleado();
      }
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
  } else {
    this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:'Campos obligatorios sin rellenar', life: 5000});
  }
  }

  selectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.files = file;
    }
  }

  sendDate(event, model){
    this.test[model] = this.utilsService.datePickerToString(event);
  }

  sendDateEdit(event, model){
    this.testEdit[model] = this.utilsService.datePickerToString(event);
    this.formModelEdit.get('fechaTest').setValue(this.utilsService.datePickerToString(event));
  }

  download(test) {
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


  isValidForm(){
    return this.formModel.get('fechaTest').valid && this.formModel.get('tipo').valid  && 
    this.formModel.get('resultado').valid && this.formModel.get('clinica').valid && this.tipoTestSelected != undefined;
  }

  eliminarTest(test){
    this.utilsService.confirm('test', constantes.MENSAJE_ELIMINAR_TEST, constantes.MENSAJE_ELIMINAR_TEST_HEADER).subscribe(res => {
      test.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.deleteTest(test).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_ELIMINADO_TEST_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_ELIMINADA_TEST_CORRECTO, life: 5000});
        this.tests = [];
        this.obtenerTestEmpleado();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_ELIMINADO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
      });
  }

  mostrarEditarTest(test){
    this.testEdit.id_test = test.id_test;
    this.testEdit.id_empleado = test.id_empleado;
    this.testEdit.id_tipo = test.id_tipo;
    this.testEdit.clinica = test.clinica;
    this.testEdit.resultado = test.resultado;
    this.testEdit.fecha_test = test.fecha_test;
    this.testEdit.nombre_archivo = test.nombre_archivo;
    this.formModelEdit.get('fechaTest').setValue(this.testEdit.fecha_test);
    this.mostrar = true;
  }

  editarTest(){
    if(this.isValidFormEdit()){
    var nombreArchivo = '';
    if(this.files !== undefined){
      nombreArchivo = this.files.name.slice(0, -4) +' (' +  this.utilsService.parseFechaHora(new Date()) + ').pdf';
      this.testEdit.nombre_archivo = nombreArchivo;
    }
    this.testEdit.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
    this.testEdit.fecha_test = this.utilsService.changeFormatDate(this.testEdit.fecha_test);
    this.connectionService.editTest(this.testEdit).subscribe((res => {
      if (nombreArchivo !== '' && this.files !== undefined) {
        const formData = new FormData();
        formData.append('file', this.files, nombreArchivo);
        this.connectionService.saveFileTest(formData).subscribe((res=> {
          this.messageService.add({
            severity: 'success', summary: constantes.MENSAJE_EDITADO_TEST_CORRECTO_CABECERA,
            detail: constantes.MENSAJE_EDITADO_TEST_CORRECTO, life: 5000
          });
          this.formModelEdit.reset();
          this.obtenerTestEmpleado();
          this.mostrar = false;
        }), (err =>{
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
        }));
      } else {
        this.messageService.add({
          severity: 'success', summary: constantes.MENSAJE_EDITADO_TEST_CORRECTO_CABECERA,
          detail: constantes.MENSAJE_EDITADO_TEST_CORRECTO, life: 5000
        });
        this.formModelEdit.reset();
        this.obtenerTestEmpleado();
        this.mostrar = false;
      }
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
  } else {
    this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
    detail:'Campos obligatorios sin rellenar', life: 5000});
  }
  }

  cancel(){
    this.formModelEdit.reset();
    this.testEdit = TEST_BLANK();
    this.mostrar = false;
  }

  isValidFormEdit(){
    return  this.formModelEdit.get('resultado').valid && this.formModelEdit.get('fechaTest').valid &&
    this.formModelEdit.get('tipo').valid && this.formModelEdit.get('clinica').valid;
  }


  //Paginación
  paginacion(list){
    this.totalRecords = list.length;
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
