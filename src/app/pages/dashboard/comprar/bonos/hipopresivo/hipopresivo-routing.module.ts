import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HipopresivoPage } from './hipopresivo.page';

const routes: Routes = [
  {
    path: '',
    component: HipopresivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HipopresivoPageRoutingModule {}
