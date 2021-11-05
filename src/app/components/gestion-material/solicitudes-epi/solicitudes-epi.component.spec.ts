import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEpiComponent } from './solicitudes-epi.component';

describe('SolicitudesEpiComponent', () => {
  let component: SolicitudesEpiComponent;
  let fixture: ComponentFixture<SolicitudesEpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesEpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesEpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
