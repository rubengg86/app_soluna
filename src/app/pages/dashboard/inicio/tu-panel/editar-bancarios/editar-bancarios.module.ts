import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarBancariosPageRoutingModule } from './editar-bancarios-routing.module';

import { EditarBancariosPage } from './editar-bancarios.page';
import { CodigoComponent2 } from './codigo/codigo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBancariosPageRoutingModule
  ],
  declarations: [EditarBancariosPage, CodigoComponent2]
})
export class EditarBancariosPageModule {}
