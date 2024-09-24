import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitarPage } from './licitar.page';

const routes: Routes = [
  {
    path: '',
    component: LicitarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitarPageRoutingModule {}
