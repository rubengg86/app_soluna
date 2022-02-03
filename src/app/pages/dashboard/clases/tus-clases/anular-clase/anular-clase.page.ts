import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioService } from '../../../../../services/servicio.service';

@Component({
  selector: 'app-anular-clase',
  templateUrl: './anular-clase.page.html',
  styleUrls: ['./anular-clase.page.scss'],
})
export class AnularClasePage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public fecha_antigua
  public grupo_antiguo
  public inicio_antiguo

  public fechaFormato
  public diaSemana;

  constructor(public modalController: ModalController, private _service: ServicioService) { }

  ngOnInit() {
    this.inicio();
  }

  inicio() {

    let a = new Date(+this.fecha_antigua*1000);
    a.setHours(3);
    
    this.getDiaSemana(a);

    this.fechaFormato = this.diaSemana + '  ' + a.toISOString().slice(8,10) + '/' + a.toISOString().slice(5,7);

  }

  getDiaSemana(fecha) {

    switch(fecha.toString().slice(0,3).toUpperCase()) {
      case 'MON': {
        this.diaSemana = 'Lunes';
        break
      }
      case 'TUE': {
        this.diaSemana = 'Martes';
        break
      }
      case 'WED': {
        this.diaSemana = 'Miércoles';
        break
      }
      case 'THU': {
        this.diaSemana = 'Jueves';
        break
      }
      case 'FRI': {
        this.diaSemana = 'Sábado';
        break
      }
      case 'SAT': {
        this.diaSemana = 'Domingo';
        break
      }
      case 'SUN': {
        this.diaSemana = 'Domingo';
        break
      }
    }
  }

  cancelarClase() {

    let date_id_antigua = this.grupo_antiguo + '_' + this.fecha_antigua;
    // console.log(date_id_antigua);

    // this._service.recordUnassistNew(date_id_antigua, 5211).subscribe( res => {
      this._service.recordUnassistNew(date_id_antigua, this.customer_id).subscribe(res => {
      // console.log(res);
      this.notificacion();
    }, error =>{
      console.log(error);
    });

  }

  notificacion() {

    let updated = new FormData()
    updated.append('customer_id', this.customer_id);
    updated.append('text', `Has anulado una clase del <b>${this.fechaFormato}</b>`);
    updated.append('type', "CLASS_CHANGE");

    this._service.saveNotification(updated).subscribe( res => {
      this.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
