import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LicitacionModalPageRoutingModule } from './licitacion-modal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacionModalPageRoutingModule
  ],
  declarations: [] // Eliminar la declaración de LicitacionModalPage aquí
})
export class LicitacionModalPageModule {}
