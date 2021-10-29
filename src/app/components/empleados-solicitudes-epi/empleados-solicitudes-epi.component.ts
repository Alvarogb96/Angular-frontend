import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { SOLICITUD_EPI_FILTROS_BLANK, SOLICITUD_EPI_BLANK } from 'src/app/core/interfaces/solicitudEpi';
import { DetalleSolicitudEmpleadoComponent } from '../detalle-solicitud-empleado/detalle-solicitud-empleado.component';
import { USUARIO_BLANK } from 'src/app/core/interfaces/usuario';
@Component({
  selector: 'app-empleados-solicitudes-epi',
  templateUrl: './empleados-solicitudes-epi.component.html',
  styleUrls: ['./empleados-solicitudes-epi.component.scss']
})
export class EmpleadosSolicitudesEpiComponent implements OnInit {

  @ViewChild('detalleSolicitudEmpleado',null) detalleSolicitudEmpleado: DetalleSolicitudEmpleadoComponent;

  cols: any[];
  estadoSolicitudSel = [];
  solicitudes = [];
  emailsFiltrados = [];
  emails = [];

  filtrosBusqueda = SOLICITUD_EPI_FILTROS_BLANK();
  mostrarDetalle: boolean = false;
  buscarPulsado: boolean = false;

  first = 0;
  rows = 5;
  totalRecords: any;
  empleado = USUARIO_BLANK();
  materiales = [];

  formModel = this.fb.group({
    email:[null,],
    estado: [null,],
  });

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService) { 
      this.estadoSolicitudSel = [
        {name: 'Sin aprobar',code: '-'},
        {name: 'Aprobadas', code: 'S'},
        {name: 'No aprobadas', code: 'N'},
    ];
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'email', header: 'Email' },
      { field: 'fecha_solicitud', header: 'Fecha solicitud' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha_aprobacion', header: 'Fecha aprobación' },
      { field: 'detalle', header: 'Detalle' }
  ];
    }

  ngOnInit(): void {
    this.filtrosBusqueda.sucursal = this.utilsService.getSucursalUsuario();
    this.filtrosBusqueda.estado = '-';
    this.filtrosBusqueda.id_propio = this.utilsService.getIdUsuario();
    this.obtenerEmails();
    this.obtenerSolicitudesEPI();
    
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

  obtenerSolicitudesEPI(){
    this.connectionService.getAllSolicitudesEPI(this.filtrosBusqueda).subscribe((res => {
      if(res != undefined && res != null){
        if(res.solicitudesEpi.length > 0){
          this.solicitudes = res.solicitudesEpi;
          this.solicitudes.forEach(solicitud => {
            solicitud.fecha_creacion = this.utilsService.getDateStringSinHora(solicitud.fecha_creacion);
            solicitud.aprobada = this.utilsService.estadoSolicitud(solicitud.aprobada);
            solicitud.fecha_aprobacion = this.utilsService.getDateStringSinHora(solicitud.fecha_aprobacion);
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

  buscar(){
    this.buscarPulsado = true;
    this.obtenerSolicitudesEPI();
  }

  getSolicitud(solicitud){
    this.connectionService.getEmpleadoById(solicitud.id_empleado).subscribe((res => {
      if(res != null && res != undefined){
        this.empleado = this.utilsService.asignarEmpleado(res.empleado);
      }
      
    }));
    this.connectionService.getMaterialesSolicitudEPI(solicitud.id_solicitud).subscribe(res => {
      this.materiales = res.materialesSolicitud;
      this.mostrarDetalle = true;
    });
    
  }

  cerrarDetalle(event){
    if(!event){
      this.mostrarDetalle = false;
    }
  }

  aprobarSolicitud(solicitud){
    this.utilsService.confirm('aprobarSolicitud', constantes.MENSAJE_APROBAR_SOLICITUD_EPI, 
    constantes.MENSAJE_APROBAR_SOLICITUD_EPI_HEADER).subscribe(res => {
        var solEpi = SOLICITUD_EPI_BLANK();
        solEpi.id_solicitud = solicitud.id_solicitud;
        solEpi.id_empleado = solicitud.id_empleado;
        solEpi.id_directivo = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
        solEpi.fecha_creacion = solicitud.fecha_creacion;
        solEpi.aprobada = constantes.APROBADA;
        solEpi.fecha_aprobacion = this.utilsService.parseFechaHora(new Date());
        this.connectionService.updateSolicitudEpi(solEpi).subscribe((res => {
          if(res){
            this.messageService.add({severity:'success', summary: constantes.MENSAJE_SOLICITUD_APROBADA_ACTUALIZADA, 
            detail: constantes.MENSAJE_SOLICITUD_ACTUALIZADA, life: 8000});
            this.buscarPulsado = false;
            this.obtenerSolicitudesEPI();
          }
        }));
      
    });
  }

  rechazarSolicitud(solicitud){
    this.utilsService.confirm('aprobarSolicitud', constantes.MENSAJE_RECHAZAR_SOLICITUD_EPI, 
    constantes.MENSAJE_RECHAZAR_SOLICITUD_EPI_HEADER).subscribe(res => {
        var solEpi = SOLICITUD_EPI_BLANK();
        solEpi.id_solicitud = solicitud.id_solicitud;
        solEpi.id_empleado = solicitud.id_empleado;
        solEpi.id_directivo = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
        solEpi.fecha_creacion = solicitud.fecha_creacion;
        solEpi.aprobada = constantes.NO_APROBADA;
        solEpi.fecha_aprobacion = this.utilsService.parseFechaHora(new Date());
        this.connectionService.updateSolicitudEpi(solEpi).subscribe((res => {
          this.messageService.add({severity:'success', summary: constantes.MENSAJE_SOLICITUD_RECHAZADA_ACTUALIZADA, 
            detail: constantes.MENSAJE_SOLICITUD_ACTUALIZADA, life: 8000});
            this.buscarPulsado = false;
            this.obtenerSolicitudesEPI();
        }));
      
    });
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
