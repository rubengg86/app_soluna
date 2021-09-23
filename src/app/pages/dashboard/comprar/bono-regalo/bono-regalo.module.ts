import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BonoRegaloPageRoutingModule } from './bono-regalo-routing.module';

import { BonoRegaloPage } from './bono-regalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BonoRegaloPageRoutingModule
  ],
  declarations: [BonoRegaloPage]
})
export class BonoRegaloPageModule {}
