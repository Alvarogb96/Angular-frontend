import { Injectable } from '@angular/core';
import {constantes} from '../../constantes';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class UtilsService {

  constructor(public confirmationService: ConfirmationService) { }


  getRole(tipo) {
    var stringRole = '';
    if (tipo === constantes.ROLE_EMPLEADO) {
      stringRole = constantes.ROLE_EMPLEADO_COMPLETO;
    } else if (tipo === constantes.ROLE_DIRECTIVO) {
      stringRole = constantes.ROLE_DIRECTIVO_COMPLETO;
    } else if (tipo === constantes.ROLE_EMPRESA) {
      stringRole = constantes.ROLE_EMPRESA_COMPLETO;
    }
    return stringRole;
  }

  confirm(key?: string, mensaje?: string, header?: string, objAux?: any): Observable<any>{
    const aux = new Subject();
    this.confirmationService.confirm({
      acceptLabel: constantes.PALABRA_ACEPTAR,
      rejectLabel: constantes.PALABRA_CANCELAR,
      key : key,
      header: header? header : 'Confirmación',
      message: mensaje,
      accept: () => {
        aux.next(objAux)
      },
      reject: () => {
      }
    });
    return aux;
  }

}
