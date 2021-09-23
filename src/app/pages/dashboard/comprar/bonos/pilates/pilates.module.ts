import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilatesPageRoutingModule } from './pilates-routing.module';

import { PilatesPage } from './pilates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilatesPageRoutingModule
  ],
  declarations: [PilatesPage]
})
export class PilatesPageModule {}
