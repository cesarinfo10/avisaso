import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMiLicitacionPageRoutingModule } from './ver-mi-licitacion-routing.module';

import { VerMiLicitacionPage } from './ver-mi-licitacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMiLicitacionPageRoutingModule
  ],
  declarations: [VerMiLicitacionPage]
})
export class VerMiLicitacionPageModule {}
