import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { SOLICITUD_BAJA_BLANK, SolicitudBaja } from 'src/app/core/interfaces/baja';
import { constantes } from 'src/app/core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { saveAs } from 'file-saver';
import { Table } from 'primeng/table'; 
import { DetalleSolicitudBajaComponent } from '../detalle-solicitud-baja/detalle-solicitud-baja.component';

@Component({
  selector: 'app-gestionbaja',
  templateUrl: './gestionbaja.component.html',
  styleUrls: ['./gestionbaja.component.scss']
})
export class GestionbajaComponent implements OnInit {

  @ViewChild('detalleSolicitudBaja',null) detalleSolicitudBaja: DetalleSolicitudBajaComponent;

  @ViewChild('dt',null) dt: Table;
  guardarPulsado:boolean = false;
  mostrarDetalle: boolean = false;
  files;
  solicitud: any;
  motivo: string = '';

  baja = SOLICITUD_BAJA_BLANK();

  solicitudesBaja = [];
  cols: any[];

  //Paginación
  first = 0;
  rows = 5;
  totalRecords: any;

  formModel = this.fb.group({
    motivo:[null, [Validators.required, Validators.maxLength(255)]],
    files:[null]
    
  });

  constructor(private fb: FormBuilder,private messageService: MessageService, private connectionService: ConnectionService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.obtenerSolicitudesBaja();
  }

  obtenerSolicitudesBaja(){
    this.connectionService.getSolicitudesBajaByIdUsuario().subscribe((res =>{
      if(res.solicitudesBaja != undefined && res.solicitudesBaja.length > 0){
        this.solicitudesBaja = res.solicitudesBaja;
        this.solicitudesBaja.forEach(solicitud => {
        solicitud.fecha_creacion = this.utilsService.getDateStringSinHora(solicitud.fecha_creacion);
        solicitud.aprobada = this.utilsService.estadoSolicitud(solicitud.aprobada);
        solicitud.fecha_aprobacion = this.utilsService.getDateStringSinHora(solicitud.fecha_aprobacion);
        solicitud.fecha_baja = this.utilsService.getDateStringSinHora(solicitud.fecha_baja);
        solicitud.fecha_alta = this.utilsService.getDateStringSinHora(solicitud.fecha_alta);
        solicitud.motivoCorto = solicitud.motivo;
        if(solicitud.motivoCorto.length > 30){
          solicitud.motivoCorto = solicitud.motivoCorto.substring(0,30) + "...";
        }
      });
      this.paginacion(this.solicitudesBaja);
    }
  }), (err => {
    if(err.status === 404){
      this.totalRecords = 0;
    }
  }));
  }

selectFile(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.files = file;
  }
}

onSubmit(){
  if(!this.formModel.valid){
    this.guardarPulsado = true;
  } else {
    var nombreArchivo = '';
    if(this.files !== undefined){
      nombreArchivo = this.files.name.slice(0, -4) +' (' +  this.utilsService.parseFechaHora(new Date()) + ').pdf';
      this.baja.archivo_solicitud_baja = nombreArchivo;
    }
  this.baja.id_empleado = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
  this.baja.fecha_creacion = this.utilsService.parseFechaHora(new Date());

  this.connectionService.saveSolicitudBaja(this.baja).subscribe((res => {
    if(res){
      if(nombreArchivo !== ''){
      const formData = new FormData();
      formData.append('file', this.files, nombreArchivo);
      this.connectionService.saveFileSolicitudBaja(formData).subscribe(
        (res) => console.log(res) ,
        (err) => console.log(err)
      );
    }
      this.formModel.reset();
      this.solicitudesBaja.push( Object.assign({}, this.baja));
      this.baja = SOLICITUD_BAJA_BLANK();
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_GUARDAR_SOLICITUD_BAJA_CORRECTO_HEADER, 
          detail:constantes.MENSAJE_GUARDAR_SOLICITUD_BAJA_CORRECTO, life:6000});
      this.guardarPulsado = false;
      this.obtenerSolicitudesBaja();
    }
  }), (err => {
    this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_NOTICIA_ERRONEO, 
        detail:err.error.message, life: 5000});
  }));
  
  }
}

getEmailErrorMessage() {
  if (this.formModel.get('motivo').hasError('required')) {
    return constantes.MOTIVO_VACIO;
  } 
}

  download(solicitud) {
    if (solicitud.archivo_solicitud_baja !== undefined && solicitud.archivo_solicitud_baja !== null) {
      var nombreArchivo = solicitud.archivo_solicitud_baja;
      this.connectionService.downloadSolicitudBaja(nombreArchivo).toPromise()
        .then(blob => {
          saveAs(blob, nombreArchivo);
        })
        .catch(err => console.error("download error = ", err))
    } else {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_ERROR_ARCHIVO_SOLICITUD_BAJA_HEADER, 
          detail:constantes.MENSAJE_ERROR_ARCHIVO_SOLICITUD_BAJA, life:5000});
    }
  }

  getSolicitud(solicitud){
    this.solicitud = solicitud;
    this.mostrarDetalle = true;    
  }

  cerrarDetalle(event){
    if(!event){
      this.mostrarDetalle = false;
    }
  }

  isValidForm(){
    return this.formModel.valid;
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
    return this.solicitudesBaja ? this.first === (this.solicitudesBaja.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.solicitudesBaja ? this.first === 0 : true;
  }

}
