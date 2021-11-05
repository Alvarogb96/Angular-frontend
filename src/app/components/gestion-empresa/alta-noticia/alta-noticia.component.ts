import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { NOTICIA_BLANK } from 'src/app/core/interfaces/noticia';

@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.scss']
})
export class AltaNoticiaComponent implements OnInit {

  noticia = NOTICIA_BLANK();

  formModel = this.fb.group({
    titulo:[null, [Validators.required,Validators.maxLength(45)]],
    descripcion : [null, [Validators.required, Validators.maxLength(255)]],
  });

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  isValidForm(){
    return this.formModel.valid;
  }

  addNoticia(){
    this.utilsService.confirm('altaNoticia', constantes.MENSAJE_GUARDAR_NOTICIA, constantes.MENSAJE_GUARDAR_NOTICIA_HEADER).subscribe(res => {
    this.noticia.fecha_creacion = this.utilsService.parseFechaHora(new Date());
    this.noticia.id_sucursal = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    this.connectionService.saveNoticia(this.noticia).subscribe((res => {
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_CABECERA_AÑADIDO_NOTICIA_CORRECTO_CABECERA, 
      detail:constantes.MENSAJE_CABECERA_AÑADIDO_NOTICIA_CORRECTO, life: 5000});
      this.formModel.reset();
      this.noticia = NOTICIA_BLANK();
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_NOTICIA_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
    });
  }

}
