import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-pilates',
  templateUrl: './pilates.page.html',
  styleUrls: ['./pilates.page.scss'],
})
export class PilatesPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }
}
