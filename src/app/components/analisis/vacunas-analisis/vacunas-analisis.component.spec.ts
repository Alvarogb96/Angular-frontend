import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasAnalisisComponent } from './vacunas-analisis.component';

describe('VacunasAnalisisComponent', () => {
  let component: VacunasAnalisisComponent;
  let fixture: ComponentFixture<VacunasAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
