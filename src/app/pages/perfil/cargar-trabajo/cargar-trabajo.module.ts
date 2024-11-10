import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarTrabajoPageRoutingModule } from './cargar-trabajo-routing.module';

import { CargarTrabajoPage } from './cargar-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarTrabajoPageRoutingModule
  ],
  declarations: [CargarTrabajoPage]
})
export class CargarTrabajoPageModule {}
