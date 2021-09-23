import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilatesEmbarazadasPageRoutingModule } from './pilates-embarazadas-routing.module';

import { PilatesEmbarazadasPage } from './pilates-embarazadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilatesEmbarazadasPageRoutingModule
  ],
  declarations: [PilatesEmbarazadasPage]
})
export class PilatesEmbarazadasPageModule {}
