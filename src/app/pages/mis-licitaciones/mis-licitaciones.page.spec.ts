import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisLicitacionesPage } from './mis-licitaciones.page';

describe('MisLicitacionesPage', () => {
  let component: MisLicitacionesPage;
  let fixture: ComponentFixture<MisLicitacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisLicitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
