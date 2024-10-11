import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitacionesPageRoutingModule } from './licitaciones-routing.module';

import { LicitacionesPage } from './licitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacionesPageRoutingModule
  ],
  declarations: [LicitacionesPage]
})
export class LicitacionesPageModule {}
