import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEpiComponent } from './alta-epi.component';

describe('AltaEpiComponent', () => {
  let component: AltaEpiComponent;
  let fixture: ComponentFixture<AltaEpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
