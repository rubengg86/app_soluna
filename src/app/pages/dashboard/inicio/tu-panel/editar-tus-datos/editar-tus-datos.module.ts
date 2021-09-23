import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTusDatosPageRoutingModule } from './editar-tus-datos-routing.module';

import { EditarTusDatosPage } from './editar-tus-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTusDatosPageRoutingModule
  ],
  declarations: [EditarTusDatosPage]
})
export class EditarTusDatosPageModule {}
