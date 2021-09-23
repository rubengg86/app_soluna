import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.page.html',
  styleUrls: ['./contrasenia.page.scss'],
})
export class ContraseniaPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
