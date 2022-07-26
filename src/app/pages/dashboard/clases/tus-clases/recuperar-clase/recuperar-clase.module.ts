import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarClasePageRoutingModule } from './recuperar-clase-routing.module';

import { RecuperarClasePage } from './recuperar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarClasePageRoutingModule
  ],
  declarations: [RecuperarClasePage]
})
export class RecuperarClasePageModule {}
