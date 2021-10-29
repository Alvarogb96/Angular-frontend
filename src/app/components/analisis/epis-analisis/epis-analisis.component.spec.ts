import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisAnalisisComponent } from './epis-analisis.component';

describe('EpisAnalisisComponent', () => {
  let component: EpisAnalisisComponent;
  let fixture: ComponentFixture<EpisAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
