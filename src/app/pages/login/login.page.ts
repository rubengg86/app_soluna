import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ServicioService } from 'src/app/services/servicio.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public usuarios: Array<Usuario>=[];


  forma= new FormGroup ({
      nombre:new FormControl('hola@solunapilates.es', [Validators.required]),
      pass:new FormControl('fbfajisdkjfabjabv', [Validators.required])
  });

  constructor(private servicio: ServicioService,
              private router: Router){
  }
  /* --------------------------------------------------Recojo los datos de la BD---------------------------------------------------- */

  getUsuariosSoluna(){

    let login = this.forma.get('nombre').value;
    let password = this.forma.get('pass').value;

    console.log(login + ', ' + password);

    this.servicio.getUsers(login, password).subscribe( (res: any) => {

      if (res){
        localStorage.setItem('currentUserSoluna', res.customer_id);
    
        let hoy = new Date();
        hoy.setSeconds(3600);
        localStorage.setItem('expira', hoy.getTime().toString() );

        this.router.navigateByUrl('dashboard/tu-panel')
      }

    }, error =>{
      console.log(error);
    })
  }

  // getUsuarios(){
  //   this.servicio.getUsuarios().subscribe(
  //     result => {
  //       this.usuarios = result;

  //         //recojo el nombre y contraseña que escribo en inicio
  //         const nombreF=this.forma.value.nombre;
  //         const passF=this.forma.value.pass;

  //         let entrada=false;

  //         //bucle para recorrer los usuarios de la BD
  //         for(const usuario of this.usuarios){
  //           //si el usuario y contraseña son iguales a lo que escribo, guarda el token en el localStorage
  //           if(usuario.user===nombreF && usuario.pass===passF){
  //             localStorage.setItem('currentUserSoluna', usuario.token);
  //             entrada=true;
  //           }
  //         }


  //         if(entrada){
  //           this.router.navigate(['/dashboard/tu-panel']);
  //         }else{
  //           console.log(result);
  //           alert('Usuario y/o contraseña incorrectos');
  //           this.router.navigate(['/login']);
  //         }
  //     },
  //     error =>{
  //         console.log(error);
  //     }
  //   );
  // }

  /* --------------------------------------Compruebo esos datos con lo escrito en el formulario-------------------------------------- */
  onLogin(){
    // this.getUsuarios();
    this.getUsuariosSoluna();
  }

}
