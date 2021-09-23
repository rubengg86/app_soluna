import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-yoga-infantil',
  templateUrl: './yoga-infantil.page.html',
  styleUrls: ['./yoga-infantil.page.scss'],
})
export class YogaInfantilPage implements OnInit {

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
