import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiCuentaPage } from './mi-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: MiCuentaPage
  },
  {
    path: 'tus-datos-editar',
    loadChildren: () => import('../inicio/tu-panel/editar-tus-datos/editar-tus-datos.module').then( m => m.EditarTusDatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiCuentaPageRoutingModule {}
