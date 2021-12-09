import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { EditarTusDatosPage } from './editar-tus-datos/editar-tus-datos.page';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-tu-panel',
  templateUrl: './tu-panel.page.html',
  styleUrls: ['./tu-panel.page.scss'],
})
export class TuPanelPage{


 /*--------------------------------------------GRAFICO------------------------------------------- */
 public lineChartData: ChartDataSets[] = [
  //{ data: [0, 10, 20, 30, 45.5, 45.5, 30, 20, 10, 10, 10, 20], label: 'Asistencia'},
  { data: [0, 20, 30, 35, 40, 35, 35, 30, 30, 20, 35, 30], label: 'Pagos' }
];
public lineChartLabels: Label[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
public lineChartOptions: any = {
  responsive: true
};

public lineChartColors: Array<any> = [
 /* { // verde
    backgroundColor: '#3DC651',
    borderColor: '#1A6E26',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  },*/
  { // rojo
    backgroundColor: '#8634B0' ,
    borderColor: '#59137D',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  }
];
lineChartLegend = true;
lineChartType: ChartType = 'line';


  /*--------------------------------CALENDARIO------------------------- */
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: true,
    mode: 'single',
    dateFormat: 'Y-m-d',
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  modalDataResponse: any;

  public previsualizacion: string;
  sanitizer: any;

  constructor(public modalController: ModalController) { }


  /*----------------------------------MODAL EDITAR------------------------- */
  async editarModal() {
    const modal = await this.modalController.create({
      component: EditarTusDatosPage
    });
    return await modal.present();
  };
  /*----------------------------------MODAL BOTON COMPRAR------------------------- */
  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }








}
