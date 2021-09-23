import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotonComprarPage } from './boton-comprar.page';

const routes: Routes = [
  {
    path: '',
    component: BotonComprarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotonComprarPageRoutingModule {}
