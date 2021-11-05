import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../../core/services/connection/connection.service';
import { constantes } from '../../../core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { SolicitudEpi, SOLICITUD_EPI_BLANK, EPI_BLANK, SOLICITUD_EPI_COMPLETA_BLANK, SolicitudEpiCompleta, Epi } from 'src/app/core/interfaces/solicitudEpi';
import {MessageService} from 'primeng/api';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-solicitudepi',
  templateUrl: './solicitudepi.component.html',
  styleUrls: ['./solicitudepi.component.scss']
})
export class SolicitudepiComponent implements OnInit {

  epis = [];
  unidades=[];
  cantidades=[];

  SolicitudEpiCompleta = SOLICITUD_EPI_COMPLETA_BLANK();


  constructor(private connectionService: ConnectionService, private utilsService: UtilsService, 
    private breadcrumbService: BreadcrumbService, private messageService: MessageService) { 
    this.breadcrumbService.setItems([
      {label: 'UI Kit'},
      {label: 'List'}
    ]);
    this.unidades = [
      {name: '0', code: 0},
      {name: '1', code: 1},
      {name: '2', code: 2},
      {name: '3', code: 3},
      {name: '4', code: 4},
      {name: '5', code: 5}
    ];
  }
  

  ngOnInit(): void {
    this.obtenerEpis();
  }

  obtenerEpis(){
    var fechaActual = this.utilsService.parseFecha(new Date());
    var response = [];
    response.push(this.utilsService.getSucursalUsuario());
    response.push(fechaActual);
    this.connectionService.getEpisDisponibles(response).subscribe(res => {

      if(res.epis && res.epis.length > 0){
        this.epis = res.epis;
        this.epis.forEach(element => element.cantidadSeleccionada = 0);
      }
    })
  }

  guardarSolicitudEpi(){
    this.utilsService.confirm('altaEpi', constantes.MENSAJE_GUARDAR_SOLICITUD_EPI, constantes.MENSAJE_GUARDAR_SOLICITUD_EPI_HEADER).subscribe(res => {
      var solicitudEpi = SOLICITUD_EPI_BLANK();
      solicitudEpi.id_empleado = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
      solicitudEpi.fecha_creacion = this.utilsService.parseFechaHora(new Date());
      solicitudEpi.id_directivo = null;

      var episSolicitados = [];
      var epiSeleccionado: boolean = false;
      for(var epi of this.epis){
        if(epi.cantidadSeleccionada > 0){
          var epiSolicitado = EPI_BLANK();
          epiSolicitado.id_tipo_epi = epi.id_tipo;
          epiSolicitado.cantidad_material = epi.cantidadSeleccionada;
          episSolicitados.push(epiSolicitado);
          epiSeleccionado = true;
        }
      }
      if(epiSeleccionado){
      this.SolicitudEpiCompleta.id_sucursal = this.utilsService.getSucursalUsuario();
      this.SolicitudEpiCompleta.solicitudEpi = solicitudEpi;
      this.SolicitudEpiCompleta.epis = episSolicitados;
      this.connectionService.saveSolicitudEpi(this.SolicitudEpiCompleta).subscribe(res => {
          if(res.error === false){         
            this.messageService.add({severity:'success', summary: constantes.MENSAJE_GUARDAR_SOLICITUD_CORRECTO_HEADER, 
            detail:constantes.MENSAJE_GUARDAR_SOLICITUD_CORRECTO, life: 5000});

            this.SolicitudEpiCompleta = SOLICITUD_EPI_COMPLETA_BLANK();
            this.obtenerEpis();

          }
        else{
          this.messageService.add({severity:'info', summary: constantes.MENSAJE_GUARDAR_SOLICITUD_ERROR_HEADER, 
          detail:constantes.MENSAJE_GUARDAR_SOLICITUD_ERROR, life: 5000});
        }
      });
     } else {
      this.messageService.add({severity:'info', summary: constantes.MENSAJE_GUARDAR_SOLICITUD_ERROR_HEADER, 
      detail:constantes.MENSAJE_GUARDAR_SOLICITUD_ERROR_CANTIDAD, life: 5000});
     }
    });
  }

}
