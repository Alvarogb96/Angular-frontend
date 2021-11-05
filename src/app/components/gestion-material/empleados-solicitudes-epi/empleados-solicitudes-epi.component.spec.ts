import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosSolicitudesEpiComponent } from './empleados-solicitudes-epi.component';

describe('EmpleadosSolicitudesEpiComponent', () => {
  let component: EmpleadosSolicitudesEpiComponent;
  let fixture: ComponentFixture<EmpleadosSolicitudesEpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosSolicitudesEpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosSolicitudesEpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
