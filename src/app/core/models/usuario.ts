export class Empleado {
    id_usuario: string;
    id_sucursal: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nif: string;
    fecha_nacimiento: Date;
    fecha_alta: string;
    email: string;
    role: string;
    nombreSucursal: string;
    direccionSucursal: string;
    horaInicio: string;
    horaFin: string;
    horasSemanales: string;
    id_empresa: string;

    constructor(datos: any){
      this.id_usuario =datos && datos.empleado.id_usuario? datos.empleado.id_usuario : '';
      this.id_sucursal =datos && datos.empleado.id_sucursal? datos.empleado.id_sucursal : '';
      this.email =datos && datos.empleado.email ? datos.empleado.email : '';
      this.nombre = datos && datos.empleado.nombre ? datos.empleado.nombre : '';
      this.apellido1 = datos && datos.empleado.apellido1 ? datos.empleado.apellido1 : '';
      this.apellido2 = datos && datos.empleado.apellido2 ? datos.empleado.apellido2 : '';
      this.nif = datos && datos.empleado.nif ? datos.empleado.nif : '';
      this.fecha_nacimiento = datos && datos.empleado.fecha_nacimiento ? datos.empleado.fecha_nacimiento : '';
      this.fecha_alta = datos && datos.empleado.fecha_creacion ? datos.empleado.fecha_creacion : '';
      this.role = datos && datos.empleado.role ? datos.empleado.role : '';
      this.nombreSucursal = datos && datos.empleado.nombreSucursal ? datos.empleado.nombreSucursal : '';
      this.direccionSucursal = datos && datos.empleado.direccion ? datos.empleado.direccion : '';
      this.horaInicio = datos && datos.empleado.hora_inicio ? datos.empleado.hora_inicio : '';
      this.horaFin = datos && datos.empleado.hora_fin ? datos.empleado.hora_fin : '';
      this.horasSemanales = datos && datos.empleado.horas_semanales ? datos.empleado.horas_semanales : '';
      this.id_empresa = datos && datos.empleado.id_empresa ? datos.empleado.id_empresa : '';
    }
  }