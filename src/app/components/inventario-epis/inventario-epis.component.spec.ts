import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEpisComponent } from './inventario-epis.component';

describe('InventarioEpisComponent', () => {
  let component: InventarioEpisComponent;
  let fixture: ComponentFixture<InventarioEpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioEpisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioEpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
