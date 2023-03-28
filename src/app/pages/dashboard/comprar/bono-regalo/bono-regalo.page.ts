import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../../services/servicio.service';

@Component({
  selector: 'app-bono-regalo',
  templateUrl: './bono-regalo.page.html',
  styleUrls: ['./bono-regalo.page.scss'],
})
export class BonoRegaloPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;

  constructor(private route: Router, private _service:ServicioService) { }

  ngOnInit() {
    // this.getCliente();
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
      console.log(res);
    }, error =>{
      console.log(error);
    })
  }
}
