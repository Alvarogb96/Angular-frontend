import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { constantes } from 'src/app/core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { saveAs } from 'file-saver';
import {MessageService} from 'primeng/api';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';


@Component({
  selector: 'app-detalle-solicitud-baja',
  templateUrl: './detalle-solicitud-baja.component.html',
  styleUrls: ['./detalle-solicitud-baja.component.scss']
})
export class DetalleSolicitudBajaComponent implements OnInit {

  @Input() public solicitud;
  @Input() public empleado;
  @Output() public cerrarDetalle = new EventEmitter();
  mostrar:boolean;
  role: string = '';

  formModel = this.fb.group({
    nombre:[null,[]],
    apellido1 : [null,[]],
    apellido2: [null,[]],
    nif:[null, []],
    email:[null, []],
    role: [null,[]],
    fechaSolicitud:[null,[]],
    fechaAprobacion : [null,[]],
    fechaBaja: [null,[]],
    fechaAlta:[null, []],
    motivo:[null, []],
  });
  constructor(private fb: FormBuilder, private utilsService: UtilsService, private connectionService: ConnectionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.role = this.utilsService.getRole(this.empleado.role);
    this.mostrar = true;
  }

  aceptar() {
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
  }

  cancel(){
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
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

}
