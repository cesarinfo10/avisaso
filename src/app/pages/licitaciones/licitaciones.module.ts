import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LicitacionesPageRoutingModule } from './licitaciones-routing.module';
import { LicitacionesPage } from './licitaciones.page';
import { LicitacionModalPage } from './licitacion-modal/licitacion-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacionesPageRoutingModule
  ],
  declarations: [LicitacionesPage, LicitacionModalPage]
})
export class LicitacionesPageModule {}
