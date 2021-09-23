import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YogaInfantilPage } from './yoga-infantil.page';

const routes: Routes = [
  {
    path: '',
    component: YogaInfantilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YogaInfantilPageRoutingModule {}
