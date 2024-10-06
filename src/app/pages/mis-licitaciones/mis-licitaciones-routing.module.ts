import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisLicitacionesPage } from './mis-licitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisLicitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisLicitacionesPageRoutingModule {}
