import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AerosolunaYogaPageRoutingModule } from './aerosoluna-yoga-routing.module';

import { AerosolunaYogaPage } from './aerosoluna-yoga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AerosolunaYogaPageRoutingModule
  ],
  declarations: [AerosolunaYogaPage]
})
export class AerosolunaYogaPageModule {}
