import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilatesPage } from './pilates.page';

const routes: Routes = [
  {
    path: '',
    component: PilatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilatesPageRoutingModule {}
