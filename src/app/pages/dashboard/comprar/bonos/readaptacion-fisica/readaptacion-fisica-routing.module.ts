import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadaptacionFisicaPage } from './readaptacion-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: ReadaptacionFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadaptacionFisicaPageRoutingModule {}
