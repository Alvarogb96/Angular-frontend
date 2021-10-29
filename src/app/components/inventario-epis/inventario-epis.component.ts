import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../core/services/connection/connection.service';
import { constantes } from '../../core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventario-epis',
  templateUrl: './inventario-epis.component.html',
  styleUrls: ['./inventario-epis.component.scss']
})
export class InventarioEpisComponent implements OnInit {

  epis = [];

  //Paginación
  first = 0;
  rows = 5;
  totalRecords: any;

  constructor(private connectionService: ConnectionService,
    private utilsService: UtilsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerEpis();
  }


  obtenerEpis(){
    var id = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    this.connectionService.getEpis(id).subscribe((res => {
      if(res != undefined && res.epis != undefined){
        if(res.epis.length >0){ 
          this.epis = res.epis;
          for(var epi of this.epis){
            epi.fecha_disponibilidad = this.utilsService.getDateStringSinHora(epi.fecha_disponibilidad);
          }
        }
      }
    }), (err => {
      
    }));
  }


  eliminarEpi(epi){
    this.utilsService.confirm('epi', constantes.MENSAJE_ELIMINAR_EPI, constantes.MENSAJE_ELIMINAR_EPI_HEADER).subscribe(res => {
      epi.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.deleteEpi(epi).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_ELIMINADA_EPI_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_ELIMINADA_EPI_CORRECTO, life: 5000});
        this.epis = [];
        this.obtenerEpis();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_ELIMINADO_ERRONEO, 
          detail:err.error.message, life: 5000});
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
    return this.epis ? this.first === (this.epis.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.epis ? this.first === 0 : true;
  }

}
