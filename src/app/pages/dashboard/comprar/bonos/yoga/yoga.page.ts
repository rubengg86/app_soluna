import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';
import { ServicioService } from '../../../../../services/servicio.service';

@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.page.html',
  styleUrls: ['./yoga.page.scss'],
})
export class YogaPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;
  public actividadesRegalo;
  public yogaRegalo;
  public precio1mes;
  public precio2mes;
  public precio3mes;
  public precio6mes;

  constructor(public modalController: ModalController, private _service:ServicioService) { }

  ngOnInit() {
    this.getCliente();
  }

  getCliente() {

    // this._service.getCustomerById(this.customer_id).subscribe( res => {
    this._service.getCustomerById(5211).subscribe( res => {
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
      // console.log(res);
      this.filtroActividadesRegalo();
    }, error =>{
      console.log(error);
    })
  }

  filtroActividadesRegalo() {

    this.actividadesRegalo.forEach(element => {
      if(element.activity_code === "YOG_2H"){
        this.yogaRegalo = element;
        // console.log(this.yogaRegalo);
      }
    });

    this.precio1mes = this.yogaRegalo.amount;
    this.precio2mes = +(this.yogaRegalo.amount)*2;
    this.precio3mes = +(this.yogaRegalo.amount)*3;
    this.precio6mes = +(this.yogaRegalo.amount)*6;

  }

  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }

}
