import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosSolicitudesBajaComponent } from './empleados-solicitudes-baja.component';

describe('EmpleadosSolicitudesBajaComponent', () => {
  let component: EmpleadosSolicitudesBajaComponent;
  let fixture: ComponentFixture<EmpleadosSolicitudesBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosSolicitudesBajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosSolicitudesBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
