import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      {
        path: 'tu-panel',
        loadChildren: () => import('./inicio/tu-panel/tu-panel.module').then( m => m.TuPanelPageModule)
      },
      {
        path: 'tus-clases',
        loadChildren: () => import('./clases/tus-clases/tus-clases.module').then( m => m.TusClasesPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./clases/chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'bono-regalo',
        loadChildren: () => import('./comprar/bono-regalo/bono-regalo.module').then( m => m.BonoRegaloPageModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./comprar/tickets/tickets.module').then( m => m.TicketsPageModule)
      },
      {
        path: 'pilates',
        loadChildren: () => import('./comprar/bonos/pilates/pilates.module').then( m => m.PilatesPageModule)
      },
      {
        path: 'aerosoluna',
        loadChildren: () => import('./comprar/bonos/aerosoluna/aerosoluna.module').then( m => m.AerosolunaPageModule)
      },
      {
        path: 'readaptacion-fisica',
    loadChildren: () => import('./comprar/bonos/readaptacion-fisica/readaptacion-fisica.module').then( m => m.ReadaptacionFisicaPageModule)
      },
      {
        path: 'entrenam-personal',
        loadChildren: () => import('./comprar/bonos/entrenam-personal/entrenam-personal.module').then( m => m.EntrenamPersonalPageModule)
      },
      {
        path: 'yoga',
        loadChildren: () => import('./comprar/bonos/yoga/yoga.module').then( m => m.YogaPageModule)
      },
      {
        path: 'yoga-infantil',
        loadChildren: () => import('./comprar/bonos/yoga-infantil/yoga-infantil.module').then( m => m.YogaInfantilPageModule)
      },
      {
        path: 'hipopresivo',
        loadChildren: () => import('./comprar/bonos/hipopresivo/hipopresivo.module').then( m => m.HipopresivoPageModule)
      },
      {
        path: 'pilates-embarazadas',
    loadChildren: () => import('./comprar/bonos/pilates-embarazadas/pilates-embarazadas.module').then( m => m.PilatesEmbarazadasPageModule)
      },
      {
        path: 'mi-cuenta',
        loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
      }
    ]
  },
  {
    path: 'contrasenia',
    loadChildren: () => import('./contrasenia/contrasenia.module').then( m => m.ContraseniaPageModule)
  },
  {
    path: 'boton-comprar',
    loadChildren: () => import('./boton-comprar/boton-comprar.module').then( m => m.BotonComprarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
