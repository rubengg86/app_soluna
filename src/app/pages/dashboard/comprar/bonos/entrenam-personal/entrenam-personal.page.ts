import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-entrenam-personal',
  templateUrl: './entrenam-personal.page.html',
  styleUrls: ['./entrenam-personal.page.scss'],
})
export class EntrenamPersonalPage implements OnInit {

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
