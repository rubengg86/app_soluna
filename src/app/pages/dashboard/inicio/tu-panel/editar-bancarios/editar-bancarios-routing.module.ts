import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarBancariosPage } from './editar-bancarios.page';

const routes: Routes = [
  
  {
    path: '',
    component: EditarBancariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarBancariosPageRoutingModule {}
