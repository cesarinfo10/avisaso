import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarTrabajoPage } from './cargar-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: CargarTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarTrabajoPageRoutingModule {}
