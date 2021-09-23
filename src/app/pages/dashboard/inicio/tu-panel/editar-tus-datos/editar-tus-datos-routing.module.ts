import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTusDatosPage } from './editar-tus-datos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTusDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTusDatosPageRoutingModule {}
