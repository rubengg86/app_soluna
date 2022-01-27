import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContraseniaPage } from './contrasenia/contrasenia.page';
import { ServicioService } from '../../services/servicio.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit{

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;

  constructor(public modalController: ModalController, public router: Router, private _service: ServicioService) { }

  ngOnInit(): void {
      this.getCliente();
  }

  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
    // this._service.getCustomerById(5211).subscribe( res => {
      this.cliente = res[0];
      // console.log(res[0]);
    }, error =>{
      console.log(error);
    })
  }

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
