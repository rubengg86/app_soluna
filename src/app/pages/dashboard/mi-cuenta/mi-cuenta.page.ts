import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditarBancariosPage } from '../inicio/tu-panel/editar-bancarios/editar-bancarios.page';
import { EditarTusDatosPage } from '../inicio/tu-panel/editar-tus-datos/editar-tus-datos.page';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {

  /*--------------------------------------------GRAFICO------------------------------------------- 
  public lineChartData: ChartDataSets[] = [
    { data: [0, 10, 20, 30, 45.5, 45.5, 30, 20, 10, 10, 10, 20], label: 'Intensidad'},
    { data: [0, 20, 30, 35, 40, 35, 35, 30, 30, 20, 20, 10], label: 'Volumen' }
  ];
  public lineChartLabels: Label[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // morado
      backgroundColor: '#5a137d9a',
      borderColor: '#59137D',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    },
    { // gris
      backgroundColor: '#36363693',
      borderColor: '#363636',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    }
  ];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  /*-------------------------------------------CALENDARIO------------------------------------------ 
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: true,
    mode: 'single',
    inline:true,
    dateFormat: 'Y-m-d',locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      },
      months: {
        shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      }
    },
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };
*/
  
  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;

  constructor(public modalController: ModalController, private _service: ServicioService) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
    // this._service.getCustomerById(5225).subscribe( res => {
      this.cliente = res[0];
      // console.log(res[0]);
    }, error =>{
      console.log(error);
    })
  }

  /*-------------------------------------------------MODAL EDITAR--------------------------------------- */
  async editarModal() {
    const modal = await this.modalController.create({
      component: EditarTusDatosPage
    });
    modal.onDidDismiss().then((data) => {
      this.getCliente();
    });
    return await modal.present();
  }
  async editarBancarios() {
    const modal = await this.modalController.create({
      component: EditarBancariosPage
    });
    return await modal.present();
  }
}
