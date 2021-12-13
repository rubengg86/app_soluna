import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { CodigoComponent2 } from './codigo/codigo.component';

@Component({
  selector: 'app-editar-bancarios',
  templateUrl: './editar-bancarios.page.html',

  styleUrls: ['./editar-bancarios.page.scss'],
})
export class EditarBancariosPage implements OnInit {

  tarjeta=false;
  paypal=false;


  constructor(private modalController: ModalController ) { }

  ngOnInit() { }


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
      component: CodigoComponent2
    });
    return await modal.present();
  };
  

}
