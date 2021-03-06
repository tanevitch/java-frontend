import { ComponentFixture, TestBed } from '@angular/core/testing';

import { buscarServicioComponent } from './todos-servicios.component';

describe('buscarServicioComponent', () => {
  let component: buscarServicioComponent;
  let fixture: ComponentFixture<buscarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ buscarServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(buscarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
