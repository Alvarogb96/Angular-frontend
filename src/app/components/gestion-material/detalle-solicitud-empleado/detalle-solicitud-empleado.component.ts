import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-detalle-solicitud-empleado',
  templateUrl: './detalle-solicitud-empleado.component.html',
  styleUrls: ['./detalle-solicitud-empleado.component.scss']
})
export class DetalleSolicitudEmpleadoComponent implements OnInit {

  @Input() public empleado;
  @Input () public materiales;
  @Output() public cerrarDetalle = new EventEmitter();
  mostrar:boolean;
  role: string = '';
  cols: any[];

  formModel = this.fb.group({
    nombre:[null,[]],
    apellido1 : [null,[]],
    apellido2: [null,[]],
    nif:[null, []],
    email:[null, []],
    fechaAlta: [null, []],
    fechaNac: [null, []],
    role: [null,[]]
  });
  constructor(private fb: FormBuilder, private utilsService: UtilsService) { 
    this.cols = [
      { field: 'epi', header: 'EPI' },
      { field: 'cantidad', header: 'Cantidad solicitada'}
  ];
  }

  ngOnInit(): void {
    this.mostrar = true;
    this.role = this.utilsService.getRole(this.empleado.role);

  }


  aceptar() {
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
  }

  cancel(){
    this.mostrar = false;
    this.cerrarDetalle.emit(this.mostrar);
  }

}
