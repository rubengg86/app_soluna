import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TusClasesPageRoutingModule } from './tus-clases-routing.module';

import { TusClasesPage } from './tus-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TusClasesPageRoutingModule
  ],
  declarations: [TusClasesPage]
})
export class TusClasesPageModule {}
