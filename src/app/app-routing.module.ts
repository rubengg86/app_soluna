import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./pages/mantenimiento/mantenimiento.module').then( m => m.MantenimientoPageModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivateChild: [AuthGuard]
  },  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./pages/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
