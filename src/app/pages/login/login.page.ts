import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ServicioService } from 'src/app/services/servicio.service';
import { ModalController } from '@ionic/angular';
import { RecuperarContraseniaPage } from '../recuperar-contrasenia/recuperar-contrasenia.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public incorrecto = false;
  public usuarios: Array<Usuario>=[];

  // user local: hola@solunapilates.es
  // pass local: 987654321

  forma= new FormGroup ({
      nombre:new FormControl('', [Validators.required]),
      pass:new FormControl('', [Validators.required])
  });

  constructor(private servicio: ServicioService,
              private router: Router,
              private modalController: ModalController){  }
  /* --------------------------------------------------Recojo los datos de la BD---------------------------------------------------- */

  getUsuariosSoluna(){

    this.servicio.presentLoading();

    let login = this.forma.get('nombre').value;
    let password = this.forma.get('pass').value;

    this.servicio.getUsers(login, password).subscribe( (res: any) => {

      if (res){
        localStorage.setItem('currentUserSoluna', res.customer_id);
    
        let hoy = new Date();
        hoy.setSeconds(3600);
        localStorage.setItem('expira', hoy.getTime().toString() );

        this.servicio.dismissLoading();
        this.router.navigateByUrl('dashboard/tu-panel')
      } else {
        this.incorrecto = true;
        this.servicio.dismissLoading();
      }

    }, error =>{
      console.log(error);
    })
  }

  async recuperarContrasenia() {
    const modal = await this.modalController.create({
      component: RecuperarContraseniaPage
    });
    return await modal.present();
  }

  /* --------------------------------------Compruebo esos datos con lo escrito en el formulario-------------------------------------- */
  onLogin(){
    // this.getUsuarios();
    this.getUsuariosSoluna();
  }

}
