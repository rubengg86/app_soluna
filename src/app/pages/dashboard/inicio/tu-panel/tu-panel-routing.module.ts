import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuPanelPage } from './tu-panel.page';

const routes: Routes = [
  {
    path: '',
    component: TuPanelPage
  },
  {
    path: 'editar-tus-datos',
    loadChildren: () => import('./editar-tus-datos/editar-tus-datos.module').then( m => m.EditarTusDatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuPanelPageRoutingModule {}
