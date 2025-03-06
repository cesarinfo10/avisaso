import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicitacionModalPage } from './licitacion-modal.page';

describe('LicitacionModalPage', () => {
  let component: LicitacionModalPage;
  let fixture: ComponentFixture<LicitacionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
