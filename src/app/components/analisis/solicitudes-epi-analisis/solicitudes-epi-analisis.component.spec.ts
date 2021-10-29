import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEpiAnalisisComponent } from './solicitudes-epi-analisis.component';

describe('SolicitudesEpiAnalisisComponent', () => {
  let component: SolicitudesEpiAnalisisComponent;
  let fixture: ComponentFixture<SolicitudesEpiAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesEpiAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesEpiAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
