import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { STOCK_MINIMO_TABLA_BLANK, STOCK_MINIMO_BLANK } from 'src/app/core/interfaces/stockMinimo';

@Component({
  selector: 'app-stock-minimo',
  templateUrl: './stock-minimo.component.html',
  styleUrls: ['./stock-minimo.component.scss']
})
export class StockMinimoComponent implements OnInit {

  tiposEpi = [];
  stockEpis = [];
  mostrar = false;

  formModel = this.fb.group({
    tipo:[null, [Validators.required]],
    minimo : [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTiposEpi();
  }

  getTiposEpi(){
    this.connectionService.getTiposEpi().subscribe(res => {
      if(res != undefined){
        if(res.tiposEpi != undefined){
          for(var tipoEpi of res.tiposEpi){
            var aux = STOCK_MINIMO_TABLA_BLANK()
            aux.descripcion = tipoEpi.descripcion;
            aux.image = tipoEpi.image;
            aux.id_tipo_epi = tipoEpi.id_tipo_epi;
            this.tiposEpi.push(aux);
          }
          this.connectionService.getStockEpiBySucursal(this.utilsService.getIdUsuario()).subscribe((res2 => {
            if(res2 != undefined){
              if(res2.stockMinimo.length > 0){
                for(var stock of res2.stockMinimo){
                  var enc = this.tiposEpi.filter(tipoEpi => tipoEpi.id_tipo_epi === stock.id_tipo_epi);
                    var index = this.tiposEpi.indexOf(enc[0]);
                    this.tiposEpi[index].minimo = stock.minimo;
                    this.tiposEpi[index].idsucursales_stock_epi = stock.idsucursales_stock_epi;
                  }
                this.mostrar = true;
                
              }
            }
          }), (err=> {
            this.mostrar = true;
          }));
        }
      }
    });
  }

  guardar(){
    this.utilsService.confirm('stock', constantes.MENSAJE_GUARDAR_STOCK_MINIMO, constantes.MENSAJE_GUARDAR_SOLICITUD_EPI_HEADER).subscribe(res => {
    for(var tipoEpi of this.tiposEpi){
      var stockMinimo = STOCK_MINIMO_BLANK();
      if(tipoEpi.idsucursales_stock_epi != null){
        stockMinimo.idsucursales_stock_epi = tipoEpi.idsucursales_stock_epi;
        stockMinimo.id_tipo_epi = tipoEpi.id_tipo_epi;
        stockMinimo.id_sucursal = this.utilsService.getIdUsuario();
        stockMinimo.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
        if(tipoEpi.minimo === "" || tipoEpi.minimo === undefined || tipoEpi.minimo === null || tipoEpi.minimo < 0){
          stockMinimo.minimo = '0';
        } else {
          stockMinimo.minimo = tipoEpi.minimo;
        }
      } else {
        stockMinimo.id_tipo_epi = tipoEpi.id_tipo_epi;
        stockMinimo.id_sucursal = this.utilsService.getIdUsuario();
        stockMinimo.fecha_creacion = this.utilsService.parseFechaHora(new Date());
        if(tipoEpi.minimo === "" || tipoEpi.minimo === undefined || tipoEpi.minimo === null || tipoEpi.minimo < 0){
          stockMinimo.minimo = '0';
        } else {
          stockMinimo.minimo = tipoEpi.minimo;
        }
      }
      this.stockEpis.push(stockMinimo);
      
    }
    this.connectionService.saveStockMinimo(this.stockEpis).subscribe((res => {
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_GUARDAR_STOCK_CORRECTO_HEADER, 
            detail:constantes.MENSAJE_GUARDAR_STOCK_CORRECTO, life: 5000});
      this.tiposEpi = [];
      this.stockEpis = [];
      this.getTiposEpi();
    }),(err => {
      this.messageService.add({severity:'info', summary: constantes.MENSAJE_GUARDAR_SOLICITUD_ERROR_HEADER, 
      detail:err.error.message, life: 5000});

    }));
  });
  }

}
