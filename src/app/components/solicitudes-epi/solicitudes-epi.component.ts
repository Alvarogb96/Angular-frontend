import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../core/services/connection/connection.service';
import { constantes } from '../../core/constantes';
import {SOLICITUD_EPI_TABLA_BLANK, EPI_TABLA_BLANK} from 'src/app/core/interfaces/solicitudEpi';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-solicitudes-epi',
  templateUrl: './solicitudes-epi.component.html',
  styleUrls: ['./solicitudes-epi.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class SolicitudesEpiComponent implements OnInit {

  solicitudes = [];
  cols: any[];

  first = 0;
  rows = 5;
  totalRecords: any;

  constructor(private connectionService: ConnectionService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.obtenerSolicitudesEpi();
  }


  obtenerSolicitudesEpi(){
    this.connectionService.getSolicitudesEpiByIdUsuario(sessionStorage.getItem('token')).subscribe(res =>{
      this.paginacion(res.solicitudesEpiEmpleado);
      res.solicitudesEpiEmpleado.forEach(element => {
        var solicitud = SOLICITUD_EPI_TABLA_BLANK();
        solicitud.id_solicitud = element.id_solicitud;
        solicitud.fecha_creacion = this.utilsService.getDateStringSinHora(element.fecha_creacion);
        solicitud.aprobada = this.utilsService.estadoSolicitud(element.aprobada);
        solicitud.fecha_aprobacion = this.utilsService.getDateStringSinHora(element.fecha_aprobacion);
        solicitud.materiales = [];
        if(element.materialesSolicitud.length > 0 && element.materialesSolicitud !== undefined){
          element.materialesSolicitud.forEach(element => {
            var epi = EPI_TABLA_BLANK();
            epi.descripcion = element.descripcion;
            epi.cantidad_material_solicitado = element.cantidad_material_solicitado;
            epi.image = element.image;
            solicitud.materiales.push(epi);
          });
        }
        this.solicitudes.push(solicitud);
      });
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
