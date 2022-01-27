import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaichiPage } from './taichi.page';

const routes: Routes = [
  {
    path: '',
    component: TaichiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaichiPageRoutingModule {}
