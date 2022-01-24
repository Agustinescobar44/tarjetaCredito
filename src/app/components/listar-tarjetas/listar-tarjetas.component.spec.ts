import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTarjetasComponent } from './listar-tarjetas.component';

describe('ListarTarjetasComponent', () => {
  let component: ListarTarjetasComponent;
  let fixture: ComponentFixture<ListarTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTarjetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
