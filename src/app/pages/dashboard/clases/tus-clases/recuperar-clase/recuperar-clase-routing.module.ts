import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarClasePage } from './recuperar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarClasePageRoutingModule {}
