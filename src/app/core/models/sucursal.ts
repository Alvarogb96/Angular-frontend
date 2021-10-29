export class Sucursal {
    id_sucursal: string;
    id_empresa: string;
    nombre: string;
    nif: string;
    direccion: string;
    fecha_creacion: string;
    email: string;
    fecha_actualizacion: string;

    constructor(datos: any){
      this.id_sucursal =datos && datos.sucursal.id_sucursal? datos.sucursal.id_sucursal : '';
      this.id_empresa =datos && datos.sucursal.id_empresa? datos.sucursal.id_empresa : '';
      this.email =datos && datos.sucursal.email ? datos.sucursal.email : '';
      this.nombre = datos && datos.sucursal.nombre ? datos.sucursal.nombre : '';
      this.direccion = datos && datos.sucursal.direccion ? datos.sucursal.direccion : '';
      this.fecha_actualizacion = datos && datos.sucursal.fecha_actualizacion ? datos.sucursal.fecha_actualizacion : '';
      this.nif = datos && datos.sucursal.nif ? datos.sucursal.nif : '';
      this.fecha_creacion = datos && datos.sucursal.fecha_creacion ? datos.sucursal.fecha_creacion : '';
    }
  }