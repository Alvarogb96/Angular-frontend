import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNoticiaComponent } from './alta-noticia.component';

describe('AltaNoticiaComponent', () => {
  let component: AltaNoticiaComponent;
  let fixture: ComponentFixture<AltaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
