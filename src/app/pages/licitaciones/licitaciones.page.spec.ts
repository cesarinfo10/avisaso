import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicitacionesPage } from './licitaciones.page';

describe('LicitacionesPage', () => {
  let component: LicitacionesPage;
  let fixture: ComponentFixture<LicitacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
