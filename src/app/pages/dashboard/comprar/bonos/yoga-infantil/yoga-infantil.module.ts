import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YogaInfantilPageRoutingModule } from './yoga-infantil-routing.module';

import { YogaInfantilPage } from './yoga-infantil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YogaInfantilPageRoutingModule
  ],
  declarations: [YogaInfantilPage]
})
export class YogaInfantilPageModule {}
