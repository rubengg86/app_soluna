import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BotonComprarPage } from '../../../boton-comprar/boton-comprar.page';
import { ServicioService } from '../../../../../services/servicio.service';

@Component({
  selector: 'app-hipopresivo',
  templateUrl: './hipopresivo.page.html',
  styleUrls: ['./hipopresivo.page.scss'],
})
export class HipopresivoPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;
  public actividadesRegalo;
  public hipoRegalo;
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
      console.log(res);
      this.filtroActividadesRegalo();
    }, error =>{
      console.log(error);
    })
  }

  filtroActividadesRegalo() {

    this.actividadesRegalo.forEach(element => {
      if(element.activity_code === "EPER_2H"){
        this.hipoRegalo = element;
        // console.log(this.hipoRegalo);
      }
    });

    this.precio1mes = this.hipoRegalo.amount;
    this.precio2mes = +(this.hipoRegalo.amount)*2;
    this.precio3mes = +(this.hipoRegalo.amount)*3;
    this.precio6mes = +(this.hipoRegalo.amount)*6;

  }

  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }

}
