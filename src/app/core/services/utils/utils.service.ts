import { Injectable } from '@angular/core';
import {constantes} from '../../constantes';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, throwError } from 'rxjs';
import {DatePipe}from '@angular/common';
import  jwt_decode from 'jwt-decode';
import { USUARIO_BLANK } from '../../interfaces/usuario';
import { ConnectionService } from '../connection/connection.service';
import { FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root',
  
})
export class UtilsService {

  usuario: any;

  calendario =  {
    closeText: "Cerrar",
    prevText: "Anterior",
    nextText: "Siguiente",
    monthNames: ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    weekHeader: "Semana",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    timeOnlyTitle: "Solo hora",
    timeText: "Tiempo",
    hourText: "Hora",
    minuteText: "Minuto",
    secondText: "Segundo",
    currentText: "Fecha actual",
    ampm: false,
    month: "Mes",
    week: "Semana",
    day: "Día",
    allDayText : "Todo el día" };

  constructor(public confirmationService: ConfirmationService, private datePipe: DatePipe, private connectionService: ConnectionService) { }


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

  setRole(tipo) {
    var role = '';
    if (tipo === constantes.ROLE_EMPLEADO_COMPLETO) {
      role = constantes.ROLE_EMPLEADO;
    } else if (tipo === constantes.ROLE_DIRECTIVO_COMPLETO) {
      role = constantes.ROLE_DIRECTIVO;
    } else if (tipo === constantes.ROLE_EMPRESA_COMPLETO) {
      role = constantes.ROLE_EMPRESA;
    }
    return role;
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
      },
    });
    return aux;
  }

  confirmCustom(key?: string, mensaje?: string, header?: string, acceptLabel?: string, rejectLabel?: string,objAux?: any): Observable<any>{
    const aux = new Subject();
    this.confirmationService.confirm({
      acceptLabel: acceptLabel? acceptLabel : constantes.PALABRA_ACEPTAR,
      rejectLabel: rejectLabel? rejectLabel :constantes.PALABRA_CANCELAR,
      key : key,
      header: header? header : 'Confirmación',
      message: mensaje,
      accept: () => {
        aux.next(true)
      },
      reject: () => {
        aux.next(false)
      },
    });
    return aux;
  }

  getDateStringSinHora(fecha){
    return this.datePipe.transform(fecha, 'dd/MM/y');
  }

  parseFechaHora(fecha){
    return this.datePipe.transform(fecha, 'y-MM-dd, h:mm:ss');
  }

  parseFecha(fecha){
    return this.datePipe.transform(fecha, 'y-MM-dd');
  }

  parseHora(fecha){
    return this.datePipe.transform(fecha, 'H:mm:ss');
  }

  changeFormatDate(fecha){
    var dateParts = fecha.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return this.parseFecha(dateObject);
  }

  obtenerIdUsuarioByToken(token){
    const decoded = jwt_decode(token);
    var id = decoded['userId']
    return id;
  }

  public handlerError(err): Observable<any> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `${err.error.message}`;
    }
    
    return throwError(err);
  }

  estadoSolicitud(aprobada){
    var estado = '';
    if(aprobada === 'S'){
      estado = constantes.ESTADO_APROBADA;
    } else if(aprobada === 'N'){
      estado = constantes.ESTADO_RECHAZADA;
    } else {
      estado = constantes.ESTADO_EN_REVISION;
    }
    return estado;
  }

  asignarEmpleado(empleado){
    var emp = USUARIO_BLANK();
    emp.id_usuario = empleado.id_usuario;
    emp.nombre = empleado.nombre;
    emp.apellido1 = empleado.apellido1;
    emp.apellido2 = empleado.apellido2;
    emp.nif = empleado.nif;
    emp.email = empleado.email;
    emp.fecha_nacimiento = this.getDateStringSinHora(empleado.fecha_nacimiento);
    emp.fecha_creacion = this.getDateStringSinHora(empleado.fecha_creacion);
    emp.role = empleado.role;
    return emp;
  }

  getSucursalUsuario(){
    var sucursal: string;
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario != null && this.usuario != null){
      if(this.usuario.id_sucursal != null && this.usuario.id_sucursal != null){
        sucursal = this.usuario.id_sucursal;
      }
    } else {
      this.usuario = this.connectionService.getEmpleadoById(this.getIdUsuario());
      if(this.usuario != null && this.usuario != null){
        if(this.usuario.id_sucursal != null && this.usuario.id_sucursal != null){
          sucursal = this.usuario.id_sucursal;
        }
      }
    }
    return sucursal;
  }

  getEmpresa(){
    var empresa: string;
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario != null && this.usuario != null){
      if(this.usuario.id_empresa != null && this.usuario.id_empresa != null){
        empresa = this.usuario.id_empresa;
      }
    } else {
      this.usuario = this.connectionService.getEmpleadoById(this.getIdUsuario());
      if(this.usuario != null && this.usuario != null){
        if(this.usuario.id_empresa != null && this.usuario.id_empresa != null){
          empresa = this.usuario.id_empresa;
        }
      }
    }
    return empresa;
  }

  getIdUsuario(){
    var token = sessionStorage.getItem('token');
    const decoded = jwt_decode(token);
    var id = decoded['userId']
    return id;
  }

  /* Checkea si el NIF, NIE o CIF es válido*/
  public checkNIF(control?: FormControl, codigoNif?: string): any {
    let nif = control ? control.value : codigoNif;
    if (nif) {
      nif = nif.toUpperCase();
      if (/^(\d|[XYZ])\d{7}[A-Z]$/.test(nif)) {
        let num = nif.match(/\d+/);
        num = (nif[0] !== 'Z' ? nif[0] !== 'Y' ? 0 : 1 : 2) + num;
        if (nif[8] === 'TRWAGMYFPDXBNJZSQVHLCKE'[num % 23]) {
          if (control) {
            return null;
          } else {
            return /^\d/.test(nif) ? 'DNI' : 'NIE';
          }
        }
      } else if (/^[ABCDEFGHJKLMNPQRSUVW]\d{7}[\dA-J]$/.test(nif)) {
        const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
        const match = nif.match(CIF_REGEX);
        const letter = match[1];
        const num = match[2];
        const cont = match[3];

        let evenSum = 0;
        let oddSum = 0;
        let n;

        for (let i = 0; i < num.length; i++) {
          n = parseInt(num[i], 10);

          // Odd positions (Even index equals to odd position. i=0 equals first position)
          if (i % 2 === 0) {
            // Odd positions are multiplied first.
            n *= 2;

            // If the multiplication is bigger than 10 we need to adjust
            oddSum += n < 10 ? n : n - 9;

            // Even positions
            // Just sum them
          } else {
            evenSum += n;
          }

        }
        const controlDigit = ((10 - +((evenSum + oddSum) + '').substr(-1)).toString().substr(-1));
        const controlLetter = 'JABCDEFGHI'.substr(+controlDigit, 1);
        // Control must be a digit
        if (letter.match(/[ABEH]/)) {
          if (cont === controlDigit) {
            return control ? null : 'CIF';
          }
          // Control must be a letter
        } else if (letter.match(/[KPQS]/)) {
          if (cont === controlLetter) {
            return control ? null : 'CIF';
          }
          // Can be either
        } else {
          if (cont.toString() === controlDigit || cont === controlLetter) {
            return control ? null : 'CIF';
          }
        }
      }
    } else {
      return null;
    }
    return control ? { formatNIFIncorrect: true } : null;
  }

  public parseDatePickerData(fecha: string): NgbDateStruct {
    const fechaArray = fecha.split(' ')[0].split('/');
    const day = parseInt(fechaArray[0], 10);
    const month = parseInt(fechaArray[1], 10);
    const year = parseInt(fechaArray[2], 10);
    const i: NgbDateStruct = { day, month, year };
    // i.day = day;
    // i.month = month;
    // i.year = year;

    return i;
  }

  public datePickerToString(date, until?) {
    const fecha: Date = this.setParseHours(until ? 'until' : null, date);
    // return this.datePipe.transform(fecha, 'dd/MM/y HH:mm:ss' );
    return this.datePipe.transform(fecha, 'dd/MM/y');
  }

  public setParseHours(type, date) {
    try {
      let value = null;
      if (date) {
        if (date.month < 10) {
          date.month = '0' + date.month;
        }
        if (date.day < 10) {
          date.day = '0' + date.day;
        }
        // const hours = date.hours.split(':');
        // const parseDate = new Date(date.year + '/' + date.month + '/' + date.day);
        const parseDate = new Date();
        parseDate.setMonth(+date.month - 1);
        parseDate.setUTCFullYear(+date.year);
        parseDate.setDate(+date.day);
        // parseDate.setHours(+hours[0], +hours[1], +hours[2]);
        // if (type === 'until') {
        //   parseDate.setHours(23, 59, 59);
        // } else {
        //   parseDate.setHours(0, 0, 0);
        // }
        value = new Date(parseDate.getTime()).toISOString();
      }

      return value;
    } catch (error) {
      return '';
    }
  }

  deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.deepCopy(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isnt supported.');
  }


  isEqualsDateAndCompleteDate(fecha: NgbDateStruct, fechaCompleta: string) {
    const fechaArray = fechaCompleta.split(' ')[0].split('/');
    const day = parseInt(fechaArray[0], 10);
    const month = parseInt(fechaArray[1], 10);
    const year = parseInt(fechaArray[2], 10);
    return fecha && day === fecha.day && month === fecha.month && year === fecha.year;
  }

}
