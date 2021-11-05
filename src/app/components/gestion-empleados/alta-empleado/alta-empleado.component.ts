import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { USUARIO_ALTA_BLANK } from 'src/app/core/interfaces/usuario';
import {MessageService} from 'primeng/api';
import { constantes } from 'src/app/core/constantes';
import { TranslateService } from '@ngx-translate/core';
import { JORNADA_BLANK } from 'src/app/core/interfaces/jornada';


@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss']
})
export class AltaEmpleadoComponent implements OnInit {

  usuario = USUARIO_ALTA_BLANK();
  jornada = JORNADA_BLANK();
  roleSel = [];

  formModel = this.fb.group({
    nombre:[null, [Validators.required,Validators.maxLength(40)]],
    apellido1 : [null, [Validators.required, Validators.maxLength(40)]],
    apellido2: [null, [Validators.required, Validators.maxLength(40)]],
    nif:[null, [Validators.required, Validators.maxLength(9),Validators.minLength(9), this.utilsService.checkNIF]],
    email:[null, [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.maxLength(100)]],
    password2: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.maxLength(100)]],
    fechaNac: [null, []],
    role: [null, [Validators.required]],
    horaInicio:[null, [Validators.required]],
    horaFin:[null, [Validators.required]],
    horasSemanales:[null, [Validators.required]],
  });

  constructor(private translate: TranslateService, private fb: FormBuilder, private connectionService: ConnectionService, private utilsService: UtilsService,
    private messageService: MessageService) { 
      translate.setDefaultLang('es');
      this.roleSel = [
        {name: constantes.ROLE_EMPLEADO_COMPLETO,code: constantes.ROLE_EMPLEADO},
        {name: constantes.ROLE_DIRECTIVO_COMPLETO, code: constantes.ROLE_DIRECTIVO},
    ];

    const browserLang = translate.getBrowserLang();
        let lang = 'es';
        this.changeLang(lang);
    }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
  

  isValidForm(){
    return this.formModel.valid;
  }

  sendDate(event, model){
    this.usuario[model] = this.utilsService.datePickerToString(event);
  }

  addEmpleado(){
    this.utilsService.confirm('altaUsuario', constantes.MENSAJE_GUARDAR_USUARIO, constantes.MENSAJE_GUARDAR_USUARIO_HEADER).subscribe(res => {
    this.usuario.fecha_creacion = this.utilsService.parseFechaHora(new Date());
    this.usuario.id_sucursal = this.utilsService.getSucursalUsuario();
    if(this.usuario.fecha_nacimiento != '' && this.usuario.fecha_nacimiento != null){
      this.usuario.fecha_nacimiento = this.utilsService.changeFormatDate(this.usuario.fecha_nacimiento);
    }
    this.jornada.fecha_creacion = this.utilsService.parseFechaHora(new Date());
    
    this.jornada.hora_inicio = this.utilsService.parseHora(this.jornada.hora_inicio);
    this.jornada.hora_fin = this.utilsService.parseHora(this.jornada.hora_fin);
    this.connectionService.saveUsuario(this.usuario, this.jornada).subscribe((res => {
      this.messageService.add({severity:'success', summary: constantes.MENSAJE_AÑADIDO_USUARIO_CORRECTO_CABECERA, 
      detail:constantes.MENSAJE_AÑADIDO_USUARIO_CORRECTO, life: 5000});
      this.usuario = USUARIO_ALTA_BLANK();
      this.jornada = JORNADA_BLANK();
      this.formModel.reset();
    }), (err => {
      this.jornada = JORNADA_BLANK();
      this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
    }));
    });
  }

  getNewPasswordMessage() {
    if(this.formModel.get('password').hasError('pattern')){
      return constantes.MENSAJE_EXPRESION_REGULAR;
    } else if(this.formModel.get('password').hasError('required')){
      return constantes.CAMPO_OBLIGATORIO;
    }
  }

  getNewPassword2Message() {
    if(this.formModel.get('password2').hasError('pattern')){
      return constantes.MENSAJE_EXPRESION_REGULAR;
    } else if(this.formModel.get('password2').hasError('required')){
      return constantes.CAMPO_OBLIGATORIO;
    } else {
      return constantes.CONTRASEÑAS_DISTINTAS;
    }
  }

  comprobarPasswordIguales(){
    if(this.formModel.get('password').value != '' && this.formModel.get('password').value != null){
      if(this.formModel.get('password2').value != '' && this.formModel.get('password2').value != null){
        if(this.formModel.get('password2').value != this.formModel.get('password').value){
          return true;
        } 
      }
    }
    return false;
  }

}
