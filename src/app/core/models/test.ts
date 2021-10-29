export class Test {
    id_test: number;
    id_empleado: number;
    id_tipo: number;
    resultado: string;
    fecha_test: Date;
    clinica: string;
    nombre: string;
    nombre_archivo: string;

    constructor(datos: any){
      this.id_test =datos && datos.id_test? datos.id_test : '';
      this.id_empleado =datos && datos.id_empleado ? datos.id_empleado : '';
      this.nombre = datos && datos.nombre ? datos.nombre : '';
      this.id_tipo = datos && datos.id_tipo ? datos.id_tipo : '';
      this.resultado = datos && datos.resultado ? datos.resultado : '';
      this.fecha_test = datos && datos.fecha_test ? datos.fecha_test : '';
      this.clinica = datos && datos.clinica ? datos.clinica : '';
      this.nombre_archivo = datos && datos.nombre_archivo ? datos.nombre_archivo : '';
    }
  }