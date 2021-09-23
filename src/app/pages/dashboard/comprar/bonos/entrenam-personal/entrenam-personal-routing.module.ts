import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamPersonalPage } from './entrenam-personal.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamPersonalPageRoutingModule {}
