import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilatesEmbarazadasPage } from './pilates-embarazadas.page';

const routes: Routes = [
  {
    path: '',
    component: PilatesEmbarazadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilatesEmbarazadasPageRoutingModule {}
