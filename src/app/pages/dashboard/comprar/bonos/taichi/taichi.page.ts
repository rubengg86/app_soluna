import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioService } from '../../../../../services/servicio.service';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';

@Component({
  selector: 'app-taichi',
  templateUrl: './taichi.page.html',
  styleUrls: ['./taichi.page.scss'],
})
export class TaichiPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;
  public actividadesRegalo;
  public taiRegalo;
  public precio1mes;
  public precio2mes;
  public precio3mes;
  public precio6mes;

  constructor(public modalController: ModalController, private _service:ServicioService) { }

  ngOnInit() {
    this.getCliente();
  }

  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
      this.cliente = res[0];
      // console.log(res[0]);

      this.getActividadesRegalo();
    }, error =>{
      console.log(error);
    })
  }

  getActividadesRegalo() {
    this._service.getBondActivities(this.cliente.center_id).subscribe( res => {
      this.actividadesRegalo = res;
      console.log(res);
      this.filtroActividadesRegalo();
    }, error =>{
      console.log(error);
    })
  }

  filtroActividadesRegalo() {

    this.actividadesRegalo.forEach(element => {
      if(element.activity_code === "TAI_2H"){
        this.taiRegalo = element;
        // console.log(this.taiRegalo);
      }
    });

    this.precio1mes = this.taiRegalo.amount;
    this.precio2mes = +(this.taiRegalo.amount)*2;
    this.precio3mes = +(this.taiRegalo.amount)*3;
    this.precio6mes = +(this.taiRegalo.amount)*6;

  }

  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }

}
