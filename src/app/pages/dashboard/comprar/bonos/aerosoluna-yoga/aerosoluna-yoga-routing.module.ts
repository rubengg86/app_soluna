import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AerosolunaYogaPage } from './aerosoluna-yoga.page';

const routes: Routes = [
  {
    path: '',
    component: AerosolunaYogaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AerosolunaYogaPageRoutingModule {}
