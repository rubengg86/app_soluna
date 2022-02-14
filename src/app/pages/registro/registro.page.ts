import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // 9416018W para no registrado por ejemplo

  public data = this.fb.group({
    dni: ['', [Validators.required]],
  });

  constructor(private modalController: ModalController, private fb: FormBuilder,
    private _service: ServicioService, private alertController: AlertController) { }

  ngOnInit() {
  }

  registrar() {

    this._service.getCheckCustomer(this.data.get('dni').value).subscribe( async (res:any) => {

      if (res.Result) {

        if ( res.Result == 'ERROR_USER_ALREADY_REGISTERED'){
          const alert = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Este usuario ya está registrado',
            buttons: [{
              cssClass: 'confirmarCambiarBoton',
              text: 'OK',
              role: 'cancel',
            }]
          });
          await alert.present();

        } else if (res.Result == 'ERROR_NOT_REGISTERED'){

          const alert = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Tu DNI no aparece registrado en nuestra base de datos de clientes, si crees que es un error contacta la recepción de tu centro.',
            buttons: [{
              cssClass: 'confirmarCambiarBoton',
              text: 'OK',
              role: 'cancel',
            }]
          });
          await alert.present();

        }
        
      } else {
      
        if (res.email) {
          this._service.registerUser(res.id).subscribe( async ok => {

            const alert = await this.alertController.create({
              cssClass: 'confirmarCambiar',
              header: 'Te hemos enviado un email con tu clave para acceder.',
              subHeader: 'Si no lo recibes, por favor contacta con la recepción de tu centro Soluna o en el 984 085 323',
              buttons: [{
                cssClass: 'confirmarCambiarBoton',
                text: 'OK',
                handler: () => {
                  this.dismiss();
                } 
              }]
            });
            await alert.present();

          })

        } else {

          this._service.registerUser(res.id).subscribe( async ok => {

            const alert = await this.alertController.create({
              cssClass: 'confirmarCambiar',
              header: 'Te hemos enviado un sms con tu clave para acceder.',
              subHeader: 'Si no lo recibes, por favor contacta con la recepción de tu centro Soluna o en el 984 085 323',
              buttons: [{
                cssClass: 'confirmarCambiarBoton',
                text: 'OK',
                handler: () => {
                  this.dismiss();
                } 
              }]
            });
            await alert.present();

          })

        }
      }

    })

  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
