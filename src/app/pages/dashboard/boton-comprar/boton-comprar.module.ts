import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotonComprarPageRoutingModule } from './boton-comprar-routing.module';

import { BotonComprarPage } from './boton-comprar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonComprarPageRoutingModule
  ],
  declarations: [BotonComprarPage]
})
export class BotonComprarPageModule {}
