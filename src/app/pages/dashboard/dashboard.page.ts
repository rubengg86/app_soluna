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
  public email = 'mailto:aviles@solunapilates.es';

  constructor(public modalController: ModalController, public router: Router, private _service: ServicioService) { }

  ngOnInit(): void {
      this.getCliente();
  }

  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
    // this._service.getCustomerById(5211).subscribe( res => {
      this.cliente = res[0];
      // console.log(res[0]);

      this.buscarCentros();
    }, error =>{
      console.log(error);
    })
  }

  buscarCentros() {

    this._service.getCenters().subscribe( result => {
      // console.log(result);

      result.forEach(element => {
        if (element.id == this.cliente.center_id){
          this.email = `mailto:${element.email}`;
        }
      });

    }, error => {
      console.log(<any>error);
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
