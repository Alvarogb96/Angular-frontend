import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../../core/services/connection/connection.service';
import { FormBuilder, Validators } from '@angular/forms';
import { constantes } from 'src/app/core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { saveAs } from 'file-saver';
import {MessageService} from 'primeng/api';
import { VACUNA_BLANK } from 'src/app/core/interfaces/vacuna';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.scss']
})
export class VacunasComponent implements OnInit {

  vacunas = [];
  cols: any[];
  first = 0;
  rows = 5;
  totalRecords: any;

  pautaCompletaSel = [];
  tipoVacunaSel = [];
  usuario: any;
  vacuna = VACUNA_BLANK();
  tipoVacunaSelected:string;
  files;

  vacunaEdit = VACUNA_BLANK();
  pautaCompleta: any;
  mostrar: boolean = false;


  formModel = this.fb.group({
    tipo:[null, [Validators.required]],
    pautaCompleta: [null,[Validators.required]],
    fechaVacuna:[null, [Validators.required]],
    files:[null]
  });

  formModelEdit = this.fb.group({
    tipo:[null, [Validators.required]],
    pautaCompleta: [null,[]],
    fechaVacuna:[null, [Validators.required]],
    files:[null]
  });

  constructor(private connectionService: ConnectionService, private utilsService: UtilsService, private messageService: MessageService,
    private fb: FormBuilder) { 
      this.pautaCompletaSel = [
        {name: 'Sí',code: 1},
        {name: 'No', code: 0},
    ];
    }

  ngOnInit(): void {
    this.getTiposVacuna();
    this.obtenerVacunasEmpleado();
  }

  getTiposVacuna(){
    this.connectionService.getTiposVacuna().subscribe(res => {
      if(res != undefined){
        if(res.tiposVacuna != undefined){
          this.tipoVacunaSel = res.tiposVacuna;
        }
      }
    });
  }

  obtenerVacunasEmpleado(){
    this.connectionService.getVacunasByIdEmpleado(this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'))).subscribe((res =>{
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
        this.paginacion(this.vacunas);
    }
  }), (err =>{
    if(err.status === 404){
      this.totalRecords = 0;
    }
  }));
    
  }

  addVacuna(){
    if(this.isValidForm()){
    var nombreArchivo = '';
    if(this.files !== undefined){
      nombreArchivo = this.files.name.slice(0, -4) +' (' +  this.utilsService.parseFechaHora(new Date()) + ').pdf';
      this.vacuna.nombre_archivo = nombreArchivo;
    }
    this.vacuna.id_tipo_vacuna = this.tipoVacunaSelected;
    this.vacuna.id_empleado = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    this.vacuna.fecha_vacuna = this.utilsService.changeFormatDate(this.vacuna.fecha_vacuna);
    this.vacuna.fecha_creacion = this.utilsService.parseFechaHora(new Date());
    
    
    this.connectionService.saveVacuna(this.vacuna).subscribe((res => {
      if (nombreArchivo !== '') {
        const formData = new FormData();
        formData.append('file', this.files, nombreArchivo);
        this.connectionService.saveFileVacuna(formData).subscribe((res=> {
          this.messageService.add({
            severity: 'success', summary: constantes.MENSAJE_CABECERA_AÑADIDO_CORRECTAMENTE,
            detail: constantes.MENSAJE_VACUNA_AÑADIDA_CORRECTAMENTE, life: 5000
          });
          this.formModel.reset();
          this.obtenerVacunasEmpleado();
        }), (err =>{
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
        }));
      } else {
        this.messageService.add({
          severity: 'success', summary: constantes.MENSAJE_CABECERA_AÑADIDO_CORRECTAMENTE,
          detail: constantes.MENSAJE_VACUNA_AÑADIDA_CORRECTAMENTE, life: 5000
        });
        this.formModel.reset();
        this.obtenerVacunasEmpleado();
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
    this.vacuna[model] = this.utilsService.datePickerToString(event);
    this.formModel.get('fechaVacuna').setValue(this.utilsService.datePickerToString(event));
  }

  sendDateEdit(event, model){
    this.vacunaEdit[model] = this.utilsService.datePickerToString(event);
    this.formModelEdit.get('fechaVacuna').setValue(this.utilsService.datePickerToString(event));
  }

  download(vacuna) {
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


  isValidForm(){
    return this.formModel.get('fechaVacuna').valid && this.formModel.get('tipo').valid && 
    this.tipoVacunaSelected != undefined && this.formModel.get('pautaCompleta').valid;
  }

  eliminarVacuna(vacuna){
    this.utilsService.confirm('vacuna', constantes.MENSAJE_ELIMINAR_VACUNA, constantes.MENSAJE_ELIMINAR_VACUNA_HEADER).subscribe(res => {
      vacuna.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.deleteVacuna(vacuna).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_ELIMINADA_VACUNA_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_ELIMINADA_VACUNA_CORRECTO, life: 5000});
        this.vacunas = [];
        this.obtenerVacunasEmpleado();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_ELIMINADO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
      });
  }

  mostrarEditarVacuna(vacuna){
    this.vacunaEdit.id_vacuna = vacuna.id_vacuna;
    this.vacunaEdit.id_empleado = vacuna.id_empleado;
    this.vacunaEdit.id_tipo_vacuna = vacuna.id_tipo_vacuna;
    if(vacuna.pauta_completa === 'Sí'){
      this.pautaCompleta = 1;
    } else {
      this.pautaCompleta = 0;
    }
    this.vacunaEdit.fecha_vacuna = vacuna.fecha_vacuna;
    this.vacunaEdit.nombre_archivo = vacuna.nombre_archivo;
    this.formModelEdit.get('fechaVacuna').setValue(this.vacunaEdit.fecha_vacuna);
    this.mostrar = true;
  }

  editarVacuna(){
    if(this.isValidFormEdit()){
    var nombreArchivo = '';
    if(this.files !== undefined){
      nombreArchivo = this.files.name.slice(0, -4) +' (' +  this.utilsService.parseFechaHora(new Date()) + ').pdf';
      this.vacunaEdit.nombre_archivo = nombreArchivo;
    }
    this.vacunaEdit.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
    this.vacunaEdit.fecha_vacuna = this.utilsService.changeFormatDate(this.vacunaEdit.fecha_vacuna);
    this.vacunaEdit.pauta_completa = this.pautaCompleta;
    
    this.connectionService.editVacuna(this.vacunaEdit).subscribe((res => {
      if (nombreArchivo !== '' && this.files !== undefined) {
        const formData = new FormData();
        formData.append('file', this.files, nombreArchivo);
        this.connectionService.saveFileVacuna(formData).subscribe((res=> {
          this.messageService.add({
            severity: 'success', summary: constantes.MENSAJE_EDITADA_VACUNA_CORRECTO_CABECERA,
            detail: constantes.MENSAJE_EDITADA_VACUNA_CORRECTO, life: 5000
          });
          this.formModelEdit.reset();
          this.obtenerVacunasEmpleado();
          this.mostrar = false;
        }), (err =>{
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
        }));
      } else {
        this.messageService.add({
          severity: 'success', summary: constantes.MENSAJE_EDITADA_VACUNA_CORRECTO_CABECERA,
          detail: constantes.MENSAJE_EDITADA_VACUNA_CORRECTO, life: 5000
        });
        this.formModelEdit.reset();
        this.obtenerVacunasEmpleado();
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
    this.vacunaEdit = VACUNA_BLANK();
    this.mostrar = false;
  }

  isValidFormEdit(){
    return this.formModelEdit.get('pautaCompleta').valid && this.formModelEdit.get('fechaVacuna').valid &&
    this.formModelEdit.get('tipo').valid;
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
    return this.vacunas ? this.first === (this.vacunas.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vacunas ? this.first === 0 : true;
  }

}
