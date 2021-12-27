import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { ServicioService } from '../../../../services/servicio.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  providers: [ServicioService]
})
export class TicketsPage implements OnInit {


/*-------- Día y mes Actual ---------*/
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();

  public centros;
  


  
  ticket=true;

  /*--------------------------------CALENDARIO FLATPICKR---------------------------- */
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: true,
    mode: 'single',
    dateFormat: 'Y-m-d',
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  constructor(public modalController: ModalController, private _service: ServicioService) { }

  buscarCentros() {

    this._service.getCenters().subscribe( result => {

      this.centros = result;
      console.log(this.centros);

    }, error => {
      console.log(<any>error);
    })
  }


  ngOnInit() {
     this.buscarCentros();
  }

  /*--------------------------------MODAL BOTONES COMPRAR ---------------------------- */
  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }





}
