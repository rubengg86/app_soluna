import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { EditarTusDatosPage } from './editar-tus-datos/editar-tus-datos.page';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tu-panel',
  templateUrl: './tu-panel.page.html',
  styleUrls: ['./tu-panel.page.scss','./tu-panel.page.css'],
})



export class TuPanelPage{

/*-------- Mes y año Actual ---------*/
  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth();
  

  constructor(public modalController: ModalController, private calendar: NgbCalendar) {}


 /*--------------------------------------------GRAFICO------------------------------------------- */
 public lineChartData: ChartDataSets[] = [
  //{ data: [0, 10, 20, 30, 45.5, 45.5, 30, 20, 10, 10, 10, 20], label: 'Asistencia'},
  { data: [0, 20, 30, 35, 40, 35, 35, 30, 30, 20, 35, 30], label: 'Pagos' },
    { data: [0, 10, 30, 35, 10, 35, 35, 30, 30, 20, 35, 30], label: 'Bonos' },
      { data: [0,0,0,0,0,0,0,35, 0,0,30], label: 'Tickets' },
];
public lineChartLabels: Label[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
public lineChartOptions: any = {
  responsive: true
};

public lineChartColors: Array<any> = [
  { // verde
    backgroundColor: 'transparent',
    borderColor: '#1A6E26',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  },
  { // morado
    backgroundColor: 'transparent' ,
    borderColor: '#59137D',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  },
  { // rojo
    backgroundColor: 'transparent' ,
    borderColor: '#FF6C6C',
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

/*------------------- OBTENER DÍA ACTUAL -------------------*/

 model: NgbDateStruct;
  date: {year: number, month: number};

    selectToday() {
        this.model = this.calendar.getToday();
      }





}
