import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularClasePageRoutingModule } from './anular-clase-routing.module';

import { AnularClasePage } from './anular-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularClasePageRoutingModule
  ],
  declarations: [AnularClasePage]
})
export class AnularClasePageModule {}
