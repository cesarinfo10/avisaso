import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargarTrabajoPage } from './cargar-trabajo.page';

describe('CargarTrabajoPage', () => {
  let component: CargarTrabajoPage;
  let fixture: ComponentFixture<CargarTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
