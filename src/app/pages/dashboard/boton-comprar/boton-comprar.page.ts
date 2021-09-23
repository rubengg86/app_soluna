import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CodigoComponent } from './codigo/codigo.component';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.page.html',
  styleUrls: ['./boton-comprar.page.scss'],
})
export class BotonComprarPage implements OnInit {

  tarjeta=false;
  paypal=false;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  change(event){
    const radio=event.target.id;
    if(radio==='tarjeta'){
      this.tarjeta=true;
      this.paypal=false;
    }else if (radio==='paypal'){
      this.tarjeta=false;
      this.paypal=true;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async codigoModal() {
    const modal = await this.modalController.create({
      component: CodigoComponent
    });
    return await modal.present();
  };


}
