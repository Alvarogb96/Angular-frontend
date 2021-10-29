import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../core/services/connection/connection.service';
import { constantes } from '../../core/constantes';
import {Empleado} from '../../core/models/usuario';
import { SUCURSAL_BLANK } from 'src/app/core/interfaces/sucursal';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import {UtilsService} from '../../core/services/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Sucursal } from 'src/app/core/models/sucursal';
import {MessageService} from 'primeng/api';
import { USUARIO_CAMBIO_PASSWORD_BLANK } from 'src/app/core/interfaces/usuario';

@Component({
  selector: 'app-datosgenerales',
  templateUrl: './datosgenerales.component.html',
  styleUrls: ['./datosgenerales.component.scss']
})
export class DatosgeneralesComponent implements OnInit {

  usuario: any;
  usuarioCambioPassword = USUARIO_CAMBIO_PASSWORD_BLANK();
  sucursal: any;
  empresa: any;
  role: string = '';
  apellidos: string = '';

  numEmpleados: string = '';
  numDirectivos: string = '';

  edit: boolean = true;
  cambioPassword: boolean = false;

  mensajePassword: string = constantes.CONTRASEÑAS_DISTINTAS;
  
  formModel = this.fb.group({
    nombre:[null, []],
    apellido1 : [null, []],
    apellido2: [null, []],
    nif:[null, []],
    email:[null, []],
    fechaNac: [null, []],
    role: [null, []],
    horaInicio:[null, []],
    horaFin:[null, []],
    horasSemanales:[null, []],
    fechaAlta:[null, []],
    direccion:[null, []],
    nombreSucursal:[null, []],
    numEmpleados:[null, []],
    numDirectivos:[null, []]
  });

  formModelPassword = this.fb.group({
    password:[null, []],
    newPassword:[null, []],
    newPassword2:[null, []]
  });

  constructor(private connectionService: ConnectionService, private fb: FormBuilder,private utilsService: UtilsService, 
    private route: ActivatedRoute, private messageService: MessageService) { 
  }

  ngOnInit(): void {
        this.role = sessionStorage.getItem('role');
        if(this.role !== constantes.ROLE_EMPRESA){
          this.obtenerDatosEmpleado();
          this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
        } else {
          this.obtenerDatosSucursal();
        }
    
  }

  obtenerDatosEmpleado(){
    this.connectionService.getEmpleadoByIdToken(sessionStorage.getItem('token')).subscribe(res =>{
      if(res !== undefined){
          this.usuario = new Empleado(res);
          this.usuario.fecha_nacimiento = this.utilsService.getDateStringSinHora(this.usuario.fecha_nacimiento);
          this.usuario.fecha_alta = this.utilsService.getDateStringSinHora(this.usuario.fecha_alta);
          if(this.usuario.horaInicio != ''){
            this.usuario.horaInicio = this.usuario.horaInicio.slice(0, -3);
          }
          if(this.usuario.horaFin != ''){
            this.usuario.horaFin = this.usuario.horaFin.slice(0, -3);
          }
      }
      
  });
  }

  sendDate(event, model){
    this.usuario[model] = this.utilsService.datePickerToString(event);
  }

  obtenerDatosSucursal(){
    this.connectionService.getSucursalByIdToken(sessionStorage.getItem('token')).subscribe(res =>{
      if(res !== undefined){
          this.sucursal = new Sucursal(res);
          this.sucursal.fecha_creacion = this.utilsService.getDateStringSinHora(this.sucursal.fecha_creacion); 
          this.numEmpleados = res.sucursal.empleados
          this.numDirectivos = res.sucursal.directivos;
      }
      
  });
  }

  editar(){
    this.edit = false;
    this.formModel.get('nombre').setValidators([Validators.required, Validators.maxLength(40)]);
    this.formModel.get('nombre').updateValueAndValidity();
    this.formModel.get('apellido1').setValidators([Validators.required, Validators.maxLength(40)]);
    this.formModel.get('apellido1').updateValueAndValidity();
    this.formModel.get('apellido2').setValidators([Validators.required, Validators.maxLength(40)]);
    this.formModel.get('apellido2').updateValueAndValidity();
    this.formModel.get('nif').setValidators([Validators.required, Validators.maxLength(9),Validators.minLength(9), this.utilsService.checkNIF]);
    this.formModel.get('nif').updateValueAndValidity();
    this.formModel.get('fechaNac').setValidators([Validators.required]);
    this.formModel.get('fechaNac').updateValueAndValidity();
  }

  detalle(){
    this.edit = true;
    this.formModel.get('nombre').clearValidators();
    this.formModel.get('nombre').updateValueAndValidity();
    this.formModel.get('apellido1').clearValidators();
    this.formModel.get('apellido1').updateValueAndValidity();
    this.formModel.get('apellido2').clearValidators();
    this.formModel.get('apellido2').updateValueAndValidity();
    this.formModel.get('nif').clearValidators();
    this.formModel.get('nif').updateValueAndValidity();
    this.formModel.get('fechaNac').clearValidators();
    this.formModel.get('fechaNac').updateValueAndValidity();
  }

  cambiarPassword(){
    this.cambioPassword = true;
    this.formModelPassword.get('password').setValidators([Validators.required]);
    this.formModelPassword.get('password').updateValueAndValidity();
    this.formModelPassword.get('newPassword').setValidators([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]);
    this.formModelPassword.get('newPassword').updateValueAndValidity();
    this.formModelPassword.get('newPassword2').setValidators([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]);
    this.formModelPassword.get('newPassword2').updateValueAndValidity();
  }

  guardarCambios(){
    this.utilsService.confirm('updateUsuario', constantes.MENSAJE_EDITAR_USUARIO, constantes.MENSAJE_GUARDAR_USUARIO_HEADER).subscribe(res => {
      this.usuario.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.usuario.fecha_nacimiento = this.utilsService.changeFormatDate(this.usuario.fecha_nacimiento);
      this.connectionService.updateUsuario(this.usuario).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_EDITADO_USUARIO_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_EDITADO_USUARIO_CORRECTO, life: 5000});
        this.obtenerDatosEmpleado();
        this.detalle();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
      });
  }

  guardarPassword(){
    if(this.role !== constantes.ROLE_EMPRESA){
      this.usuarioCambioPassword.id_usuario = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
      this.usuarioCambioPassword.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.updatePasswordUsuario(this.usuarioCambioPassword).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO, life: 5000});
        this.cambioPassword = false;
        this.formModelPassword.reset();
        this.usuarioCambioPassword = USUARIO_CAMBIO_PASSWORD_BLANK();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
    } else {
      this.usuarioCambioPassword.id_sucursal = this.sucursal.id_sucursal;
      this.usuarioCambioPassword.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      this.connectionService.updatePasswordSucursal(this.usuarioCambioPassword).subscribe((res => {
        this.messageService.add({severity:'success', summary: constantes.MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO_CABECERA, 
        detail:constantes.MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO, life: 5000});
        this.cambioPassword = false;
        this.formModelPassword.reset();
        this.usuarioCambioPassword = USUARIO_CAMBIO_PASSWORD_BLANK();
      }), (err => {
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
          detail:err.error.message, life: 5000});
      }));
    }
  }

  comprobarPasswordIguales(){
    if(this.formModelPassword.get('newPassword').value != '' && this.formModelPassword.get('newPassword').value != null){
      if(this.formModelPassword.get('newPassword2').value != '' && this.formModelPassword.get('newPassword2').value != null){
        if(this.formModelPassword.get('newPassword2').value != this.formModelPassword.get('newPassword').value){
          return true;
        } 
      }
    }
    return false;
  }

  cancel(){
    this.cambioPassword = false;
  }

  isValidForm(){
    return this.formModel.valid && this.usuario.fecha_nacimiento != '' && this.usuario.fecha_nacimiento != null;
  }

  isValidFormPassword(){
    return this.formModelPassword.valid;
  }

  getNombreErrorMessage() {
      if (this.formModel.get('nombre').hasError('required')) {
        return constantes.CAMPO_OBLIGATORIO;
      }
    }
    getApellido1ErrorMessage() {
      if (this.formModel.get('apellido1').hasError('required')) {
        return constantes.CAMPO_OBLIGATORIO;
      }
    }

    getApellido2ErrorMessage() {
      if (this.formModel.get('apellido2').hasError('required')) {
        return constantes.CAMPO_OBLIGATORIO;
      }
    }
    getFechaNacimientoErrorMessage() {
      if (this.formModel.get('fechaNac').hasError('required')) {
        return constantes.CAMPO_OBLIGATORIO;
      }
    }
    getNifErrorMessage() {
      if (this.formModel.get('nif').hasError('required')) {
        return constantes.CAMPO_OBLIGATORIO;
      } else if(this.formModel.get('nif').hasError('minlength')){
        return constantes.CAMPO_LONGITUD_MINIMA;
      } else {
        return constantes.FORMATO_DNI;
      }
    }

    getNewPassword2Message() {
      if(this.formModelPassword.get('newPassword2').hasError('pattern')){
        return constantes.MENSAJE_EXPRESION_REGULAR;
      } else if(this.formModelPassword.get('newPassword2').hasError('required')){
        return constantes.CAMPO_OBLIGATORIO;
      } else {
        return constantes.CONTRASEÑAS_DISTINTAS;
      }
    }

    getNewPasswordMessage() {
      if(this.formModelPassword.get('newPassword').hasError('pattern')){
        return constantes.MENSAJE_EXPRESION_REGULAR;
      } else if(this.formModelPassword.get('newPassword').hasError('required')){
        return constantes.CAMPO_OBLIGATORIO;
      }
    }

    getPasswordMessage() {
     if(this.formModelPassword.get('password').hasError('required')){
        return constantes.CAMPO_OBLIGATORIO;
     }
    }

}
