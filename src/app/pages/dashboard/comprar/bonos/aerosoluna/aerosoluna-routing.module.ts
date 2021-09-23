import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AerosolunaPage } from './aerosoluna.page';

const routes: Routes = [
  {
    path: '',
    component: AerosolunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AerosolunaPageRoutingModule {}
