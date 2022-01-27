import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContraseniaPageRoutingModule } from './recuperar-contrasenia-routing.module';

import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContraseniaPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RecuperarContraseniaPage]
})
export class RecuperarContraseniaPageModule {}
