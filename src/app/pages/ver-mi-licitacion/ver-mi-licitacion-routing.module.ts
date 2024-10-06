import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerMiLicitacionPage } from './ver-mi-licitacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerMiLicitacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerMiLicitacionPageRoutingModule {}
