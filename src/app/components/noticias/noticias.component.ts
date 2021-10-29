import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import {ConnectionService} from '../../core/services/connection/connection.service';
import { constantes } from '../../core/constantes';
import {Noticia, NOTICIA_BLANK} from '../../core/interfaces/noticia'
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias = [];
  cols: any[];
  role: any;
  first = 0;
  rows = 5;
  totalRecords: any;
  id: any;
  noticia: any;

  mostrar: boolean = false;
  detalle: boolean;

  formModel = this.fb.group({
    titulo:[null, [Validators.required,Validators.maxLength(45)]],
    descripcion : [null, [Validators.required, Validators.maxLength(255)]],
  });

  constructor(private connectionService: ConnectionService, private utilsService: UtilsService, 
    private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role');
    if(this.role === constantes.ROLE_EMPRESA){
      this.id = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    } else {
      
      this.id = this.utilsService.getSucursalUsuario();
    }
    this.obtenerNoticias(this.id);
    
  }


  obtenerNoticias(id){
    this.connectionService.getNoticiasByIdSucursal(id).subscribe(res => {
      if (res.noticias != undefined && res.noticias != null) {
        for(var not of res.noticias){
          var noticia = NOTICIA_BLANK();
          noticia = not;
          noticia.fecha_creacion = this.utilsService.parseFecha(noticia.fecha_creacion);
          this.noticias.push(noticia);
        }
        this.paginacion(this.noticias);
      }
    });
  }

  eliminarNoticia(noticia){
    this.utilsService.confirm('noticia', constantes.MENSAJE_ELIMINAR_NOTICIA, constantes.MENSAJE_ELIMINAR_NOTICIA_HEADER).subscribe(res => {
      noticia.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.deleteNoticia(noticia).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_ELIMINADA_NOTICIA_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_ELIMINADA_NOTICIA_CORRECTO, life: 5000});
        this.noticias = [];
        this.obtenerNoticias(this.id);
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_ELIMINADO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
      });
  }

  editarNoticia(noticia){
    this.noticia = noticia;
    this.mostrar = true;
    this.detalle = false;
  }

  verNoticia(noticia){
    this.noticia = noticia;
    this.mostrar = true;
    this.detalle = true;
  }

  cancel(){
    this.mostrar = false;
    this.detalle = null;
  }

  guardarNoticia(noticia){
    noticia.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
    this.connectionService.editNoticia(noticia).subscribe((res => {
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_EDITADA_NOTICIA_CORRECTO_CABECERA, 
      detail:constantes.MENSAJE_EDITADA_NOTICIA_CORRECTO, life: 5000});
      this.mostrar = false;
      this.detalle = null;
    this.detalle = false;
      this.noticias = [];
      this.obtenerNoticias(this.id);
    }), (err => {
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
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
    return this.noticias ? this.first === (this.noticias.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.noticias ? this.first === 0 : true;
  }

}
