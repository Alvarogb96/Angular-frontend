import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajasAnalisisComponent } from './bajas-analisis.component';

describe('BajasAnalisisComponent', () => {
  let component: BajasAnalisisComponent;
  let fixture: ComponentFixture<BajasAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajasAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajasAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
