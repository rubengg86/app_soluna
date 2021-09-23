import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenamPersonalPageRoutingModule } from './entrenam-personal-routing.module';

import { EntrenamPersonalPage } from './entrenam-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenamPersonalPageRoutingModule
  ],
  declarations: [EntrenamPersonalPage]
})
export class EntrenamPersonalPageModule {}
