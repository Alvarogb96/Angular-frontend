import { Component, OnInit, ViewChild } from '@angular/core';
import {MessageService} from 'primeng/api';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { constantes } from 'src/app/core/constantes';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { USUARIO_BLANK } from 'src/app/core/interfaces/usuario';
import { DetalleEmpleadoComponent } from '../detalle-empleado/detalle-empleado.component';
import { USUARIO_FILTRO_SUCURSAL_BLANK } from 'src/app/core/interfaces/usuario';
import { USUARIO_JORNADA_BLANK } from 'src/app/core/interfaces/usuario';
import { JORNADA_BLANK } from 'src/app/core/interfaces/jornada';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('detalleEmpleado',null) detalleEmpleado: DetalleEmpleadoComponent;

  roleSel = [];
  sucursalSel:  [];
  empleados = [];
  mostrarDetalleEmpleado = false;
  mostrarEdicionEmpleado = false;
  empleado = USUARIO_JORNADA_BLANK();
  empleadoEditado= USUARIO_JORNADA_BLANK();
  idSucursal: any;

  email: string;
  role: any;
  hora_inicio: any;
  hora_fin: any;
  horas_semanales: any;

  filtroBusqueda: any;

  filtrosBusqueda = USUARIO_FILTRO_SUCURSAL_BLANK();

   //Paginación
   first = 0;
   rows = 5;
   totalRecords: any;

   formModel = this.fb.group({
    tipo:[null, [Validators.required]],
    lote : [null, [Validators.required, Validators.maxLength(100)]],
    cantidad: [null, [Validators.required]]
  });

  formModelEmpleado = this.fb.group({
    email: [null, [Validators.required]],
    role: [null, [Validators.required]],
    horaInicio:[null, [Validators.required]],
    horaFin : [null, [Validators.required]],
    horasSemanales: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,private messageService: MessageService, private connectionService: ConnectionService,
    private utilsService: UtilsService) { 
      this.roleSel = [
        {name: constantes.ROLE_EMPLEADO_COMPLETO,code: constantes.ROLE_EMPLEADO},
        {name: constantes.ROLE_DIRECTIVO_COMPLETO, code: constantes.ROLE_DIRECTIVO},
    ];
    }

  ngOnInit(): void {
    this.idSucursal = this.utilsService.getSucursalUsuario();
    this.filtrosBusqueda.sucursal = this.utilsService.getSucursalUsuario();
    this.filtrosBusqueda.empresa = this.utilsService.getEmpresa();
    this.filtrosBusqueda.idPropio = this.utilsService.getIdUsuario();
    this.filtroBusqueda = 'Sucursal';
    this.getSucursales();
    this.obtenerEmpleados();
  }

  getSucursales(){
    this.connectionService.getSucursalesByIdEmpresa(this.utilsService.getEmpresa()).subscribe(res => {
      if(res != undefined){
        if(res.sucursales != undefined){
          this.sucursalSel = res.sucursales;
        }
      }
    });
  }

  

  obtenerEmpleados(){
    if(this.filtroBusqueda === 'Empresa'){
      this.filtrosBusqueda.sucursal = null;
    }
    this.connectionService.getAllEmpleadosBySucursal(this.filtrosBusqueda).subscribe((res => {
      if(res != undefined && res.empleados != undefined){
        if(res.empleados.length >0){
          this.empleados = res.empleados
          for(var empleado of this.empleados){
            empleado.fecha_creacion = this.utilsService.getDateStringSinHora(empleado.fecha_creacion);
            empleado.fecha_nacimiento = this.utilsService.getDateStringSinHora(empleado.fecha_nacimiento);
          }
          this.paginacion(this.empleados);
        }
      }
    }), (err => {
      
    }));
  }

  empleadoDetail(empleado){
    this.empleado = empleado;
    this.mostrarDetalleEmpleado = true;
  }

  cancel(){
    this.mostrarEdicionEmpleado = false;
  }

  empleadoEdit(empleado){
    this.empleado = empleado;
    if(this.empleado.hora_inicio != null){
      this.empleado.hora_inicio = this.empleado.hora_inicio.slice(0, -3);
    }
    if(this.empleado.hora_fin != null){
      this.empleado.hora_fin = this.empleado.hora_fin.slice(0, -3);
    }
    
    this.email = this.empleado.email;
    this.role = this.empleado.role;
    this.hora_fin = this.empleado.hora_fin;
    this.hora_inicio = this.empleado.hora_inicio;
    this.horas_semanales = this.empleado.horas_semanales;
    this.empleadoEditado = Object.assign(this.empleado);
    this.mostrarEdicionEmpleado = true;
  }

  guardar(){
    var editado:boolean = false;
    var jornada = this.asignarJornada();
    var cambioEmail = false;
    if((this.email !== this.empleadoEditado.email) || (this.role !== this.empleadoEditado.role)){
      this.empleadoEditado.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
      if(this.email !== this.empleadoEditado.email){
        cambioEmail = true;
      }
      var response = [];
      response.push(this.empleadoEditado);
      response.push(cambioEmail);
      this.connectionService.updateUsuarioByDirectivo(response).subscribe((res => {
        

        if(this.hora_fin !== this.empleadoEditado.hora_fin || this.hora_inicio !== this.empleadoEditado.hora_inicio ||
          this.horas_semanales !== this.empleadoEditado.horas_semanales){
            this.connectionService.updateJornadaByDirectivo(jornada).subscribe((res => {

              this.reiniciarForm();

            }),(err => {
              this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
              detail:err.message, life: 5000});


            }));
          } else {
            this.reiniciarForm();
          }
      }),(err =>{
        this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
        detail:err.error.message, life: 5000});
      }));

      
    } else if(this.hora_fin !== this.empleadoEditado.hora_fin || this.hora_inicio !== this.empleadoEditado.hora_inicio ||
      this.horas_semanales !== this.empleadoEditado.horas_semanales){
            this.connectionService.updateJornadaByDirectivo(jornada).subscribe((res => {

              this.reiniciarForm();

            }),(err => {
              this.messageService.add({severity:'error', summary: constantes.MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO, 
              detail:err.error.message, life: 5000});


            }));
    } else {
              this.obtenerEmpleados();
              this.mostrarEdicionEmpleado = false
    }

  }

  reiniciarForm(){
    this.messageService.add({
      severity: 'success', summary: constantes.MENSAJE_EDITADO_USUARIO_CORRECTO_CABECERA,
      detail: constantes.MENSAJE_EDITADO_USUARIO_CORRECTO, life: 5000
    });
    this.mostrarEdicionEmpleado = false
    this.empleadoEditado =  USUARIO_JORNADA_BLANK();
    this.formModelEmpleado.reset();
    this.obtenerEmpleados();
  }

  asignarJornada(){
    var jornada = JORNADA_BLANK();
    jornada.id_jornada = this.empleadoEditado.id_jornada;
    jornada.id_empleado = this.empleadoEditado.id_usuario;
    if(this.hora_fin !== this.empleadoEditado.hora_fin){
      jornada.hora_fin = this.utilsService.parseHora(this.empleadoEditado.hora_fin);
    } else{
      jornada.hora_fin = this.empleadoEditado.hora_fin + ":00";
    }
    if(this.hora_inicio !== this.empleadoEditado.hora_inicio){
    jornada.hora_inicio = this.utilsService.parseHora(this.empleadoEditado.hora_inicio);
    } else{
      jornada.hora_inicio = this.empleadoEditado.hora_inicio + ":00";
    }
    jornada.horas_semanales = this.empleadoEditado.horas_semanales;
    jornada.fecha_actualizacion = this.utilsService.parseFechaHora(new Date());
    jornada.fecha_creacion = this.utilsService.parseFechaHora(new Date());

    return jornada;
  }

  isValidForm(){
    return this.formModelEmpleado.valid;
  }


  cerrarDetalle(event){
    if(!event){
      this.mostrarDetalleEmpleado = false;
    }
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
    return this.empleados ? this.first === (this.empleados.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.empleados ? this.first === 0 : true;
  }

}
