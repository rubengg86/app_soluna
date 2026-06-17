import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotonComprarPageRoutingModule } from './boton-comprar-routing.module';

import { BotonComprarPage } from './boton-comprar.page';
import { CodigoComponent } from './codigo/codigo.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonComprarPageRoutingModule
  ],
  declarations: [BotonComprarPage, CodigoComponent],
  providers: [InAppBrowser]
})
export class BotonComprarPageModule {}
