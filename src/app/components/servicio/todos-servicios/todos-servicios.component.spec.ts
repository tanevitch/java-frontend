import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosServiciosComponent } from './todos-servicios.component';

describe('TodosServiciosComponent', () => {
  let component: TodosServiciosComponent;
  let fixture: ComponentFixture<TodosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
