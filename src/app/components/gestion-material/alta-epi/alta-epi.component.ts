import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { EPI_BLANK } from 'src/app/core/interfaces/epi';
import { TIPO_EPI_BLANK } from 'src/app/core/interfaces/epi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-epi',
  templateUrl: './alta-epi.component.html',
  styleUrls: ['./alta-epi.component.scss']
})
export class AltaEpiComponent implements OnInit {

  tipoEpiSel = [];
  tipoEpiSelected:string;
  epi = EPI_BLANK();
  tipoEpi = TIPO_EPI_BLANK();
  mostrar: boolean = false;

  formModel = this.fb.group({
    tipo:[null, [Validators.required]],
    lote : [null, [Validators.required, Validators.maxLength(100)]],
    cantidad: [null, [Validators.required]],
    fecha_disponibilidad: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getTiposEpi();
  }

  getTiposEpi(){
    this.connectionService.getTiposEpi().subscribe(res => {
      if(res != undefined){
        if(res.tiposEpi != undefined){
          this.tipoEpiSel = res.tiposEpi;
        }
      }
    });
  }

  isValidForm(){
    return this.formModel.get('tipo').valid && this.tipoEpiSelected !== "" && this.formModel.get('lote').valid && this.formModel.get('cantidad').valid && this.formModel.get('fecha_disponibilidad').valid;
  }

  addEpi(){
    this.utilsService.confirm('altaEpi', constantes.MENSAJE_GUARDAR_EPI, constantes.MENSAJE_GUARDAR_EPI_HEADER).subscribe(res => {
      this.epi.id_tipo = this.tipoEpiSelected;
      this.epi.fecha_creacion = this.utilsService.parseFechaHora(new Date());
      this.epi.id_sucursal = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
      this.epi.existencias = this.epi.cantidad;
      if(this.epi.fecha_disponibilidad != '' && this.epi.fecha_disponibilidad != null){
        this.epi.fecha_disponibilidad = this.utilsService.changeFormatDate(this.epi.fecha_disponibilidad);
      }
      this.connectionService.saveEPI(this.epi).subscribe((res => {
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_AÑADIDO_EPI_CORRECTO_CABECERA, 
      detail:constantes.MENSAJE_AÑADIDO_EPI_CORRECTO, life: 5000});
      
      this.router.navigateByUrl('main/epis/inventario');
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_EPI_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
    });
  }

  sendDate(event, model){
    this.epi[model] = this.utilsService.datePickerToString(event);
  }

}
