import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisLicitacionesPageRoutingModule } from './mis-licitaciones-routing.module';

import { MisLicitacionesPage } from './mis-licitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisLicitacionesPageRoutingModule
  ],
  declarations: [MisLicitacionesPage]
})
export class MisLicitacionesPageModule {}
