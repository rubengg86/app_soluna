import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TusClasesPage } from './tus-clases.page';

const routes: Routes = [
  {
    path: '',
    component: TusClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TusClasesPageRoutingModule {}
