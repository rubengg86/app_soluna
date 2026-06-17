import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ServicioService } from 'src/app/services/servicio.service';
import { ModalController } from '@ionic/angular';
import { RecuperarContraseniaPage } from '../recuperar-contrasenia/recuperar-contrasenia.page';
import { RegistroPage } from '../registro/registro.page';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public incorrect = false;
  public error = false;
  public users: Array<Usuario>=[];
  public signature: any;
  public querystring: any;
  public category: any;
  public id: any;
  public environment: any;

  // user local: hola@solunapilates.es
  // pass local: 987654321

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  });

  constructor(private service: ServicioService,
    private router: Router,
    private modalController: ModalController
  ) {
  }

  async getUsersSoluna(){

    await this.service.presentLoading();

    const login = this.form.get('nombre').value;
    const password = this.form.get('pass').value;

    this.service.getUsers(login, password).subscribe(async (res: any) => {
      if (res){
        localStorage.setItem('currentUserSoluna', res.customer_id);

        const hoy = new Date();
        hoy.setSeconds(3600);
        localStorage.setItem('expira', hoy.getTime().toString() );

        await this.service.dismissLoading();
        await this.router.navigateByUrl('dashboard/tu-panel');
      } else {
        this.incorrect = true;
        await this.service.dismissLoading();
      }

    }, error =>{
      this.environment = error;
      console.log(error);
    });
  }

  async recoverPassword() {
    const modal = await this.modalController.create({
      component: RecuperarContraseniaPage
    });
    return await modal.present();
  }

  async registerUser() {
    const modal = await this.modalController.create({
      component: RegistroPage
    });
    return await modal.present();
  }

  async onLogin(){
    await this.getUsersSoluna();
  }
}
