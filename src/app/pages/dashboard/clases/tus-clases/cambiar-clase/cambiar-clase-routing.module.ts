import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarClasePage } from './cambiar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarClasePageRoutingModule {}
