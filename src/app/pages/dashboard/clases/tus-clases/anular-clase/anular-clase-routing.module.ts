import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularClasePage } from './anular-clase.page';

const routes: Routes = [
  {
    path: '',
    component: AnularClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularClasePageRoutingModule {}
