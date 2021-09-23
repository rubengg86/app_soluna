import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BonoRegaloPage } from './bono-regalo.page';

const routes: Routes = [
  {
    path: '',
    component: BonoRegaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BonoRegaloPageRoutingModule {}
