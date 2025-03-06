import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacionModalPage } from './licitacion-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacionModalPageRoutingModule {}
