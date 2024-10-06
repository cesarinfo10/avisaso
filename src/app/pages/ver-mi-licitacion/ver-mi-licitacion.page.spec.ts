import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerMiLicitacionPage } from './ver-mi-licitacion.page';

describe('VerMiLicitacionPage', () => {
  let component: VerMiLicitacionPage;
  let fixture: ComponentFixture<VerMiLicitacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiLicitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
