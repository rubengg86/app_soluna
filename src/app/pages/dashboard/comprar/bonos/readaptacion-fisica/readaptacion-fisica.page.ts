import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-readaptacion-fisica',
  templateUrl: './readaptacion-fisica.page.html',
  styleUrls: ['./readaptacion-fisica.page.scss'],
})
export class ReadaptacionFisicaPage implements OnInit {

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
