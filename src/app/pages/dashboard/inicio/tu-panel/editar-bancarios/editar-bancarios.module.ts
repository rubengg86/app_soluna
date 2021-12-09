import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTusDatosPageRoutingModule } from './editar-bancarios-routing.module';

import { EditarBancariosPage } from './editar-bancarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBancariosPageRoutingModule
  ],
  declarations: [EditarBancariosPage]
})
export class EditarBancariosPageModule {}
