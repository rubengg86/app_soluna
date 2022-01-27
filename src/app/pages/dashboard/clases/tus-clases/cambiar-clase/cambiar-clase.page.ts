import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicioService } from '../../../../../services/servicio.service';

@Component({
  selector: 'app-cambiar-clase',
  templateUrl: './cambiar-clase.page.html',
  styleUrls: ['./cambiar-clase.page.scss'],
})
export class CambiarClasePage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public fechasLibres;
  public fechasLibresFormato;
  public fechaAntiguaFormato;
  public diaSemana;
  public huecos;
  public fecha_antigua;
  public grupo_antiguo;
  public inicio_antiguo;

  constructor(public modalController: ModalController, private _service: ServicioService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.gestionarHuecos();
  }

  gestionarHuecos(){

    // console.log(this.fecha_antigua);
    // console.log(this.grupo_antiguo);
    // console.log(this.inicio_antiguo);
    // console.log(this.huecos);

    let fecha_antigua_string = new Date(+this.fecha_antigua * 1000);
    this.getDiaSemana(fecha_antigua_string);

    this.fechaAntiguaFormato = this.diaSemana + ' ' + fecha_antigua_string.toISOString().slice(8,10) + '/' + fecha_antigua_string.toISOString().slice(5,7);

    this.fechasLibres = [];
    this.fechasLibresFormato = [];
    this.diaSemana;
    let contador = 0;

    for(let hueco in this.huecos) {
      this.fechasLibres[contador] = hueco;
      let a = new Date(+this.fechasLibres[contador]*1000);
      a.setHours(3);
      
      this.getDiaSemana(a);

      this.fechasLibresFormato[contador] = this.diaSemana + '  ' + a.toISOString().slice(8,10) + '/' + a.toISOString().slice(5,7);

      contador++;
    }

    // console.log(this.huecos[this.fechasLibres[0].start_time]);

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

  async confirmarCambiar(id, date, start_time, fechaNueva){
    
    const alert = await this.alertCtrl.create({
      cssClass: 'confirmarCambiar',
      header: '¿Seguro que quiere cambiar la clase?',

      buttons: [
        {
          cssClass: 'confirmarCambiarBoton',
          text: 'Cancelar',
          role: 'cancel', //esto hace que también pase al hacer click fuera
        },
        {
          cssClass: 'confirmarCambiarBoton',
          text: 'Cambiar',
          handler: () => {

            this.cambiar(id, date, start_time, fechaNueva);

          } 
        }
      ]
    });

    alert.present();
  }

  cambiar(id, date, start_time, fechaNueva) {

    let date_id_antigua = this.grupo_antiguo + '_' + this.fecha_antigua;
    // console.log(date_id_antigua);

    let date_id_nueva = id + '_' + date;
    // console.log(date_id_nueva);

    // console.log(start_time);

    // this._service.recordUnassistNew(date_id_antigua, 5211).subscribe( res => {
    this._service.recordUnassistNew(date_id_antigua, this.customer_id).subscribe(res => {
      // this._service.recordAssistNew(date_id_nueva, 5211).subscribe( res => {
      this._service.recordAssistNew(date_id_nueva, this.customer_id).subscribe( res => {
        // this.dismiss();
        this.notificacion(start_time, fechaNueva);
      }, error =>{
      console.log(error);
      })
    }, error =>{
      console.log(error);
    });
  }

  notificacion(start_time, fechaNueva) {

    let updated = new FormData()
    updated.append('customer_id', this.customer_id);
    updated.append('text', `Has cambiado una clase. Tu nueva clase es: <b>${fechaNueva} - ${start_time}</b>`);
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
