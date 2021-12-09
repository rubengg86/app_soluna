import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { IonicModule } from '@ionic/angular';

import { TuPanelPageRoutingModule } from './tu-panel-routing.module';

import { TuPanelPage } from './tu-panel.page';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuPanelPageRoutingModule,
    FlatpickrModule.forRoot(),
    ChartsModule
  ],
  declarations: [TuPanelPage]
})
export class TuPanelPageModule {}
