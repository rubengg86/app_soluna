import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContraseniaPage } from './contrasenia/contrasenia.page';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{

  constructor(public modalController: ModalController, public router: Router) { }

  async cambiarModal() {
    const modal = await this.modalController.create({
      component: ContraseniaPage
    });
    return await modal.present();
  }

  cerrarSesion(){
    localStorage.removeItem('currentUserSoluna');
    this.router.navigate(['/login']);
  }

}
