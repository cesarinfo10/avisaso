import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitarPageRoutingModule } from './licitar-routing.module';

import { LicitarPage } from './licitar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitarPageRoutingModule
  ],
  declarations: [LicitarPage]
})
export class LicitarPageModule {}
