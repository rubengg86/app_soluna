import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.page.html',
  styleUrls: ['./contrasenia.page.scss'],
})
export class ContraseniaPage implements OnInit {

  public customer_id = localStorage.getItem('currentUserSoluna');
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  public data = this.fb.group({
    customer_id: [this.customer_id],
    old_password: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    confirm_new_password: ['', [Validators.required]]
  },{
    validators: [this.passwordsIguales('new_password','confirm_new_password')]
  });

  constructor(public modalController: ModalController, private fb: FormBuilder,
              private alertController:AlertController, private _service: ServicioService) { }

  ngOnInit() {
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

  async cambiarContrasenia() {

    // console.log(this.data.valid);

    if (this.data.invalid) {
      const alert = await this.alertController.create({
        cssClass: 'confirmarCambiar',
        header: 'Por favor, introduzca correctamente los datos',
        buttons: [{
          cssClass: 'confirmarCambiarBoton',
          text: 'OK',
          role: 'cancel',
        }]
      });

      await alert.present();

    } else if (this.data.valid) {

      let updated = new FormData()
      updated.append('customer_id', this.data.get('customer_id').value);
      updated.append('old_password', this.data.get('old_password').value);
      updated.append('new_password', this.data.get('new_password').value);

      this._service.changeUserPassword(updated).subscribe(async (res:any) => {
        // console.log(res.Result);
        if (res.Result === 'KO') {

          const alert2 = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Contraseña erronea',
            buttons: [{
              cssClass: 'confirmarCambiarBoton',
              text: 'OK',
              role: 'cancel',
            }]
          });
  
          await alert2.present();

        } else if (res.Result === 'OK') {

          const alert3 = await this.alertController.create({
            cssClass: 'confirmarCambiar',
            header: 'Contraseña cambiada correctamente',
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
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
