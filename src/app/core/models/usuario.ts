export class Empleado {
    id_usuario: string;
    nombre: string;
    apellidos: string;
    nif: string;
    fechaNacimiento: Date;
    fechaIncorporacion: string;
    email: string;
    role: string;

    constructor(datos: any){
      this.id_usuario =datos && datos.empleado.id_usuario? datos.empleado.id_usuario : '';
      this.email =datos && datos.empleado.email ? datos.empleado.email : '';
      this.nombre = datos && datos.empleado.nombre ? datos.empleado.nombre : '';
      this.apellidos = datos && datos.empleado.apellidos ? datos.empleado.apellidos : '';
      this.nif = datos && datos.empleado.nif ? datos.empleado.nif : '';
      this.fechaNacimiento = datos && datos.empleado.fecha_nacimiento ? datos.empleado.fecha_nacimiento : '';
      this.fechaIncorporacion = datos && datos.empleado.fecha_incorporacion ? datos.empleado.fecha_incorporacion : '';
      this.role = datos && datos.empleado.role ? datos.empleado.role : '';
    }
  }