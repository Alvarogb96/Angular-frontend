import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolicitudEmpleadoComponent } from './detalle-solicitud-empleado.component';

describe('DetalleSolicitudEmpleadoComponent', () => {
  let component: DetalleSolicitudEmpleadoComponent;
  let fixture: ComponentFixture<DetalleSolicitudEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
