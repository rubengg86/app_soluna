import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';
import { ServicioService } from '../../../../../services/servicio.service';

@Component({
  selector: 'app-pilates',
  templateUrl: './pilates.page.html',
  styleUrls: ['./pilates.page.scss'],
})
export class PilatesPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;
  public actividadesRegalo;
  public pilatesRegalo;
  public pilatesBRegalo;
  public precio1mes;
  public precio2mes;
  public precio3mes;
  public precio6mes;
  public precio1mesB;
  public precio2mesB;
  public precio3mesB;
  public precio6mesB;

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
      console.log(res);
      this.filtroActividadesRegalo();
    }, error =>{
      console.log(error);
    })
  }

  filtroActividadesRegalo() {

    this.actividadesRegalo.forEach(element => {
      if(element.activity_code === "PIL_2H"){
        this.pilatesRegalo = element;
        // console.log(this.pilatesRegalo);
      }
      if (element.activity_code === "PIL_2HB"){
        this.pilatesBRegalo = element;
      }
    });

    this.precio1mes = this.pilatesRegalo.amount;
    this.precio2mes = +(this.pilatesRegalo.amount)*2;
    this.precio3mes = +(this.pilatesRegalo.amount)*3;
    this.precio6mes = +(this.pilatesRegalo.amount)*6;

    this.precio1mesB = this.pilatesBRegalo.amount;
    this.precio2mesB = +(this.pilatesBRegalo.amount)*2;
    this.precio3mesB = +(this.pilatesBRegalo.amount)*3;
    this.precio6mesB = +(this.pilatesBRegalo.amount)*6;

  }

  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }
}
