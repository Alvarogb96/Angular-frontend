import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolicitudBajaComponent } from './detalle-solicitud-baja.component';

describe('DetalleSolicitudBajaComponent', () => {
  let component: DetalleSolicitudBajaComponent;
  let fixture: ComponentFixture<DetalleSolicitudBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudBajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
