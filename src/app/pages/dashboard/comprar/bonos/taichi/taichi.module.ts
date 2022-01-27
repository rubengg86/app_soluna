import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichiPageRoutingModule } from './taichi-routing.module';

import { TaichiPage } from './taichi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichiPageRoutingModule
  ],
  declarations: [TaichiPage]
})
export class TaichiPageModule {}
