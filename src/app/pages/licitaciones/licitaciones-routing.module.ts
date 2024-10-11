import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacionesPage } from './licitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacionesPageRoutingModule {}
