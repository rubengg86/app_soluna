import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  public data = this.fb.group({
    login: ['', [Validators.required]],
  });

  constructor(private modalController: ModalController, private fb: FormBuilder,
              private _service: ServicioService, private alertController: AlertController) { }

  ngOnInit() {
  }

  recuperar() {
    if(this.data.valid){

      this._service.recoverPassword(this.data.get('login').value).subscribe( async (res:any) => {

        console.log(res);

        if (res.Result === 'KO') {

          const alert2 = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Tuvo lugar un error, inténtelo de nuevo más tarde',
            buttons: [{
              cssClass: 'confirmarCambiarBoton',
              text: 'OK',
              role: 'cancel',
            }]
          });
  
          await alert2.present();
          
        } else if (res.Result === 'OK'){

          const alert3 = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Se ha enviado el mensaje correctamente',
            buttons: [{
              cssClass: 'confirmarCambiarBoton',
              text: 'OK',
              handler: () => {
                this.dismiss();
              } 
            }]
          });
  
          await alert3.present();
        }

      })
      // console.log(this.data.get('login').value);
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
