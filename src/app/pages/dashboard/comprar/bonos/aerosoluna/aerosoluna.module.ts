import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AerosolunaPageRoutingModule } from './aerosoluna-routing.module';

import { AerosolunaPage } from './aerosoluna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AerosolunaPageRoutingModule
  ],
  declarations: [AerosolunaPage]
})
export class AerosolunaPageModule {}
