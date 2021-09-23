import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadaptacionFisicaPageRoutingModule } from './readaptacion-fisica-routing.module';

import { ReadaptacionFisicaPage } from './readaptacion-fisica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadaptacionFisicaPageRoutingModule
  ],
  declarations: [ReadaptacionFisicaPage]
})
export class ReadaptacionFisicaPageModule {}
