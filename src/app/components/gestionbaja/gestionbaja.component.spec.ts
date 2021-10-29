import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionbajaComponent } from './gestionbaja.component';

describe('GestionbajaComponent', () => {
  let component: GestionbajaComponent;
  let fixture: ComponentFixture<GestionbajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionbajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionbajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
