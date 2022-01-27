import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarClasePageRoutingModule } from './cambiar-clase-routing.module';

import { CambiarClasePage } from './cambiar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarClasePageRoutingModule
  ],
  declarations: [CambiarClasePage]
})
export class CambiarClasePageModule {}
