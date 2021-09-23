import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-aerosoluna',
  templateUrl: './aerosoluna.page.html',
  styleUrls: ['./aerosoluna.page.scss'],
})
export class AerosolunaPage implements OnInit {

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
