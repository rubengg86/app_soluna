import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HipopresivoPageRoutingModule } from './hipopresivo-routing.module';

import { HipopresivoPage } from './hipopresivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HipopresivoPageRoutingModule
  ],
  declarations: [HipopresivoPage]
})
export class HipopresivoPageModule {}
