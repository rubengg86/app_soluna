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

  // Variables que vienen al crear el modal
  ticket;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.ticket)
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

  comprar(){
    console.log(220104105724);
    let a = new Date(2022, 0, 4, 11, 57, 24).toISOString();
    console.log(a);
    let tpv_order = a.slice(2,4)+a.slice(5,7)+a.slice(8,10)+a.slice(11,13)+a.slice(14,16)+a.slice(17,19);
    console.log(tpv_order);

    let customer_id = localStorage.getItem('currentUserSoluna');
    console.log(customer_id);

    let amount = this.ticket.amount;
    console.log(amount);

    let ticket_id = this.ticket.id;
    console.log(ticket_id);
  }


}
