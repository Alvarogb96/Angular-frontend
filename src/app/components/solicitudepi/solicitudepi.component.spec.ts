import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudepiComponent } from './solicitudepi.component';

describe('SolicitudepiComponent', () => {
  let component: SolicitudepiComponent;
  let fixture: ComponentFixture<SolicitudepiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudepiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
