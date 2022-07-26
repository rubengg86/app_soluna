import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicioService } from '../../../../../services/servicio.service';


@Component({
  selector: 'app-recuperar-clase',
  templateUrl: './recuperar-clase.page.html',
  styleUrls: ['./recuperar-clase.page.scss'],
})
export class RecuperarClasePage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  public fechasLibres;
  public fechasLibresFormato;
  public fechaAntiguaFormato;
  public diaSemana;
  public huecos;
  public fecha_antigua;
  public grupo_antiguo;
  public inicio_antiguo;
  public cliente;
  public email;
  public emailFormat;
  public recoverable_number;
  public activity_name;

  constructor(public modalController: ModalController, private _service: ServicioService, private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.gestionarHuecos();
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
          this.emailFormat = element.email;
        }

        this.gestionarHuecos();
      });

    }, error => {
      console.log(<any>error);
    })
  }

  gestionarHuecos(){

    // console.log(this.fecha_antigua);
    // console.log(this.grupo_antiguo);
    // console.log(this.inicio_antiguo);
    // console.log(this.huecos);

    let fecha_antigua_string = new Date(+this.fecha_antigua * 1000);
    fecha_antigua_string.setHours(3);
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
        this.diaSemana = 'Viernes';
        break
      }
      case 'SAT': {
        this.diaSemana = 'Sábado';
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
      header: '¿Seguro que quiere recuperar la clase este día?',
      subHeader: 'No podrás volver a recuperarla en otro día',

      buttons: [
        {
          cssClass: 'confirmarCambiarBoton',
          text: 'Cancelar',
          role: 'cancel', //esto hace que también pase al hacer click fuera
        },
        {
          cssClass: 'confirmarCambiarBoton',
          text: 'Recuperar',
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

    this._service.redeemRecoverableClass(date_id_nueva, this.customer_id).subscribe( resp => {
      this._service.recordAssistNew(date_id_nueva, this.customer_id).subscribe( res => {
        // this.dismiss();
        this.notificacionCambiar(start_time, fechaNueva);
      }, error =>{
        console.log(error);
      })
    }, error =>{
      console.log(error);
    })
  }

  notificacionCambiar(start_time, fechaNueva) {

    let updated = new FormData()
    updated.append('customer_id', this.customer_id);
    updated.append('text', `Has recuperado una clase de <b>${this.activity_name}</b> el día: <b>${fechaNueva} - ${start_time}</b>`);
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
