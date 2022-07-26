import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TusClasesPage } from './tus-clases.page';

const routes: Routes = [
  {
    path: '',
    component: TusClasesPage
  },
  {
    path: 'cambiar-clase',
    loadChildren: () => import('./cambiar-clase/cambiar-clase.module').then( m => m.CambiarClasePageModule)
  },
  {
    path: 'anular-clase',
    loadChildren: () => import('./anular-clase/anular-clase.module').then( m => m.AnularClasePageModule)
  },
  {
    path: 'recuperar-clase',
    loadChildren: () => import('./recuperar-clase/recuperar-clase.module').then( m => m.RecuperarClasePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TusClasesPageRoutingModule {}
