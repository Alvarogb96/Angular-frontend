import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { SOLICITUD_EPI_FILTROS_BLANK } from 'src/app/core/interfaces/solicitudEpi';
import { SOLICITUD_BAJA_BLANK } from 'src/app/core/interfaces/baja';
import { DetalleSolicitudEmpleadoComponent } from '../detalle-solicitud-empleado/detalle-solicitud-empleado.component';
import { USUARIO_BLANK } from 'src/app/core/interfaces/usuario';
import { DetalleSolicitudBajaComponent } from '../detalle-solicitud-baja/detalle-solicitud-baja.component';

@Component({
  selector: 'app-empleados-solicitudes-baja',
  templateUrl: './empleados-solicitudes-baja.component.html',
  styleUrls: ['./empleados-solicitudes-baja.component.scss']
})
export class EmpleadosSolicitudesBajaComponent implements OnInit {

  @ViewChild('detalleSolicitudBaja',null) detalleSolicitudBaja: DetalleSolicitudBajaComponent;

  solicitudes = [];
  emailsFiltrados = [];
  emails = [];
  estadoSolicitudSel = [];
  filtrosBusqueda = SOLICITUD_EPI_FILTROS_BLANK();
  mostrarDetalle: boolean = false;
  mostrarAltaBaja: boolean = false;
  buscarPulsado: boolean = false;
  solicitud: any;
  fechaBaja: any;
  fechaAlta: any;
  solBaja = SOLICITUD_BAJA_BLANK();

  first = 0;
  rows = 5;
  totalRecords: any;

  formModel = this.fb.group({
    email:[null,],
    estado: [null,],
    fechaBaja: [null, [Validators.required]],
    fechaAlta: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService) {
      this.estadoSolicitudSel = [
        {name: 'Sin aprobar',code: '-'},
        {name: 'Aprobadas', code: 'S'},
        {name: 'No aprobadas', code: 'N'},
        {name: 'Todas', code: null}
    ];
     }

  ngOnInit(): void {
    this.filtrosBusqueda.estado = '-';
    this.filtrosBusqueda.sucursal = this.utilsService.getSucursalUsuario();
    this.filtrosBusqueda.id_propio = this.utilsService.getIdUsuario();
    this.obtenerEmails();
    this.obtenerSolicitudesBaja();
  }


  buscarEmail(event) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.emails.length; i++) {
      let email = this.emails[i];
      if (email.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(email.email);
      }
    }

    this.emailsFiltrados = filtered;
  }

  buscar(){
    this.buscarPulsado = true;
    this.obtenerSolicitudesBaja();
  }

  obtenerEmails(){
    var sucursal = this.utilsService.getSucursalUsuario();
    this.connectionService.getEmailsEmpleados(sucursal).subscribe((res => {
      if(res != null && res != undefined){
        if(res.emails != undefined){
          this.emails = res.emails;
          
        }
      }
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CONSULTA_ERRONEA_GENERICO, 
      detail: constantes.MENSAJE_CONSULTA_EMAIL_ERRONEA, life: 5000});
    }));
  }

  obtenerSolicitudesBaja(){
    this.connectionService.getAllSolicitudesBaja(this.filtrosBusqueda).subscribe((res => {
      if(res != undefined && res != null){
        if(res.solicitudesBaja.length > 0){
          this.solicitudes = res.solicitudesBaja;
          this.solicitudes.forEach(solicitud => {
            solicitud.fecha_creacion = this.utilsService.getDateStringSinHora(solicitud.fecha_creacion);
            solicitud.aprobada = this.utilsService.estadoSolicitud(solicitud.aprobada);
            solicitud.fecha_aprobacion = this.utilsService.getDateStringSinHora(solicitud.fecha_aprobacion);
            if(solicitud.fecha_baja != null && solicitud.fecha_baja != ""){
              solicitud.fecha_baja = this.utilsService.getDateStringSinHora(solicitud.fecha_baja);
              solicitud.fecha_alta = this.utilsService.getDateStringSinHora(solicitud.fecha_alta);
            }
          })
          this.paginacion(this.solicitudes);
        }
      }
    }), (err => {
      if(err.status = 404){
        this.solicitudes = [];
        if(this.buscarPulsado){
        this.messageService.add({severity:'info', summary: constantes.MENSAJE_CONSULTA_ERRONEA_GENERICO, 
        detail: constantes.MENSAJE_CONSULTA_SOLICITUD_EPI_PARAMETROS, life: 8000});
        this.solicitudes = [];
        }
      }
    }));
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


  aprobarSolicitud(solicitud){
    this.utilsService.confirm('aprobarSolicitud', constantes.MENSAJE_APROBAR_SOLICITUD_BAJA, 
    constantes.MENSAJE_APROBAR_SOLICITUD_BAJA_HEADER).subscribe(res => {
        this.solBaja.id_solicitud_baja = solicitud.id_solicitud_baja;
        this.solBaja.id_empleado = solicitud.id_empleado;
        this.solBaja.id_directivo = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
        this.solBaja.fecha_creacion = solicitud.fecha_solicitud;
        this.solBaja.aprobada = constantes.APROBADA;
        this.solBaja.fecha_aprobacion = this.utilsService.parseFechaHora(new Date());
        this.mostrarAltaBaja = true;
    });

  }

  rechazarSolicitud(solicitud){
    this.utilsService.confirm('aprobarSolicitud', constantes.MENSAJE_RECHAZAR_SOLICITUD_BAJA, 
    constantes.MENSAJE_RECHAZAR_SOLICITUD_BAJA_HEADER).subscribe(res => {
        var solBaja = SOLICITUD_BAJA_BLANK();
        solBaja.id_solicitud_baja = solicitud.id_solicitud_baja;
        solBaja.id_empleado = solicitud.id_empleado;
        solBaja.id_directivo = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
        solBaja.fecha_creacion = solicitud.fecha_solicitud;
        solBaja.aprobada = constantes.NO_APROBADA;
        solBaja.fecha_aprobacion = this.utilsService.parseFechaHora(new Date());
        this.connectionService.updateSolicitudBaja(solBaja).subscribe((res => {
          this.messageService.add({severity:'success', summary: constantes.MENSAJE_SOLICITUD_RECHAZADA_ACTUALIZADA, 
            detail: constantes.MENSAJE_SOLICITUD_ACTUALIZADA, life: 8000});
            this.buscarPulsado = false;
            this.obtenerSolicitudesBaja();
        }), (err => {
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_EPI_ERRONEO, 
          detail:err.error.message, life: 5000});
        }));
      
    });
  }

  sendDate(event, model){
    if(model === 'fechaBaja'){
      this.fechaBaja = this.utilsService.datePickerToString(event);
    } else if(model === 'fechaAlta'){
      this.fechaAlta = this.utilsService.datePickerToString(event);
    }
  }

  aceptar() {
    this.mostrarAltaBaja = false;
    this.solBaja.fecha_baja = this.utilsService.changeFormatDate(this.fechaBaja);
    this.solBaja.fecha_alta = this.utilsService.changeFormatDate(this.fechaAlta);
    this.connectionService.updateSolicitudBaja(this.solBaja).subscribe((res => {
          if(res){
            this.messageService.add({severity:'success', summary: constantes.MENSAJE_SOLICITUD_APROBADA_ACTUALIZADA, 
            detail: constantes.MENSAJE_SOLICITUD_ACTUALIZADA, life: 8000});
            this.buscarPulsado = false;
            this.obtenerSolicitudesBaja();
          }
        }), (err => {
          this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_EPI_ERRONEO, 
          detail:err.error.message, life: 5000});
        }));
  }

  cancel(){
    this.mostrarAltaBaja = false;
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
    return this.solicitudes ? this.first === (this.solicitudes.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.solicitudes ? this.first === 0 : true;
  }

}
