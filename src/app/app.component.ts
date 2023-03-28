import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './services/servicio.service';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';
import * as cryptojs from 'crypto-js';
import padZeroPadding from 'crypto-js/pad-zeropadding'
import { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'loginAdmin';
  public mantenimientos=0;

  constructor(private router: Router,
              private servicio: ServicioService,
              private deeplinks: Deeplinks,
              private platform: Platform,
              private zone: NgZone,
              private alertController: AlertController,
              private service: ServicioService) {
                
    this.initializeApp();

    // let arg = '2201041057242'
    // let order = arg.slice(0,12);
    // let state = arg.slice(-1);
    // console.log(order);
    // console.log(state);
    // let sha1 = cryptojs.SHA1('220104105724'+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+'220104105724'+'2').toString();
    // console.log(sha1);
    // this.service.getTicketPaymentUpdate(220104105724, '2', sha1).subscribe(res => {
    //   console.log(res);
    //   console.log('cambio de pago hecho');
    // });

    // this.service.getCenters().subscribe(res => {
    //   console.log(res)
    // });


      // let order = '230309145139'
      // let type = 'T'
      // let hash = '26d29e8e986d0476580eccf83a269e178ac8aacb';
      // // let hash = 'cdbf0dc5fe6b6342687bd4b8ba8719546b414423';
      // let path = 'tu-panel'

      // if(order) {

      //   // let order = arg.slice(0,12);
      //   // let state = arg.slice(-1);
    
      //   let hash1 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'1').toString();
      //   let hash2 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'2').toString();

  
      //   if(hash==hash1){
      //     path = 'tus-clases'
      //     if(type=='T') {
      //       this.service.getTicketPaymentUpdate(order, '1', hash).subscribe(res => {
      //         console.log(res);
      //         this.presentAlert('¡Tu compra se ha confirmado con éxito!');
      //       });      
      //     } else if (type=='M') {
      //       this.service.getMonthlyPaymentUpdate(order, '1').subscribe(res => {
      //         console.log(res);
      //         this.presentAlert('¡Tu compra se ha confirmado con éxito!');
      //       });      
      //     } else {
      //       let path = 'tu-panel'
      //       this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
      //     }
      //   } else if (hash==hash2) {
      //     path = 'tickets'
      //     if(type=='T') {
      //       this.service.getTicketPaymentUpdate(order, '2', hash).subscribe(res => {
      //         console.log(res);
      //         this.presentAlert('Ha ocurrido un error al completar el pago, por favor, vuelva a intentarlo dentro de unos minutos');
      //       });      
      //     } else if (type=='M') {
      //       this.service.getMonthlyPaymentUpdate(order, '2').subscribe(res => {
      //         console.log(res);
      //         this.presentAlert('Ha ocurrido un error al completar el pago, por favor, vuelva a intentarlo dentro de unos minutos');
      //       });      
      //     } else {
      //       let path = 'tu-panel'
      //       this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
      //     }   
      //   } else {
      //     this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
      //   }
      // }

      // this.zone.run(() => {
      //   this.router.navigateByUrl(`/dashboard/${path}`);
      // });

    // let key = cryptojs.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
    // let iv = cryptojs.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
    // let order = '220104105724'
    // let state = '2'
    // var encrypted = cryptojs.AES.encrypt(order+state, key, { iv: iv, padding:padZeroPadding });
    // console.log(encodeURIComponent(encrypted.toString()));
    // var decrypted = cryptojs.AES.decrypt(encrypted, key, { iv: iv }).toString(cryptojs.enc.Utf8);
    // console.log(decrypted);



  }


  initializeApp() {
    this.platform.ready().then(() => {
      // this.setupDeeplinks();
    });
  }


  // Está a medias el funcionamiento cuando vuelve a la app tras un pago
  setupDeeplinks() {
    this.deeplinks.route({
      // '/finish/:result': LoginPage,
      '/finish-app-true.php': LoginPage,
    }).subscribe(match => {
      // const path = `/login/${match.$args['result']}`;
      // const path = `/finish/${match.$args['result']}`;
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      // this.presentAlert(Object.keys(match.$args));
      console.log('Successfully matched route', match);

      let order = match.$args['order'];
      let type = match.$args['type'];
      let hash = match.$args['hash'];
      // let hash = 'cdbf0dc5fe6b6342687bd4b8ba8719546b414423';
      let path = 'tu-panel'

      if(order) {

        // let order = arg.slice(0,12);
        // let state = arg.slice(-1);
    
        let hash1 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'1').toString();
        let hash2 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'2').toString();

  
        if(hash==hash1){
          path = 'tus-clases'
          if(type=='T') {
            this.service.getTicketPaymentUpdate(order, '1', hash).subscribe(res => {
              console.log(res);
              this.presentAlert('¡Tu compra se ha confirmado con éxito!');
            });      
          } else if (type=='M') {
            this.service.getMonthlyPaymentUpdate(order, '1').subscribe(res => {
              console.log(res);
              this.presentAlert('¡Tu compra se ha confirmado con éxito!');
            });      
          } else {
            path = 'tu-panel'
            this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
          }
        } else if (hash==hash2) {
          path = 'tickets'
          if(type=='T') {
            this.service.getTicketPaymentUpdate(order, '2', hash).subscribe(res => {
              console.log(res);
              this.presentAlert('Ha ocurrido un error al completar el pago, por favor, vuelva a intentarlo dentro de unos minutos');
            });      
          } else if (type=='M') {
            this.service.getMonthlyPaymentUpdate(order, '2').subscribe(res => {
              console.log(res);
              this.presentAlert('Ha ocurrido un error al completar el pago, por favor, vuelva a intentarlo dentro de unos minutos');
            });      
          } else {
            path = 'tu-panel'
            this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
          }   
        } else {
          this.presentAlert('Ha ocurrido un error al validar el pago, por favor, uelva a intentarlo dentro de unos minutos o póngase en contacto con nosotros');
        }
      } else {
        this.presentAlert('Bad Deeplink');
      }


      // if(match.$args['order']) {

      //   let order = match.$args['order'].slice(0,12);
      //   let state = match.$args['order'].slice(-1);
    
      //   // let order = match.$args['order'];
      //   let hash = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+state).toString();

  
      //   if(state=='1'){
      //     path = 'tus-clases'
      //     this.service.getTicketPaymentUpdate(order, state, hash).subscribe(res => {
      //       console.log(res);
      //       this.presentAlert('¡Tu compra se ha confirmado con éxito!');
      //     });    
      //   } else if (state=='2') {
      //     path = 'tickets'
      //     this.service.getTicketPaymentUpdate(order, state, hash).subscribe(res => {
      //       console.log(res);
      //       this.presentAlert('Ha ocurrido un error al realizar el pago, por favor, vuelva a intentarlo dentro de unos minutos');
      //     });    
      //   }
      // }



      this.zone.run(() => {
        this.router.navigateByUrl(`/dashboard/${path}`);
      });

    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  // getMantenimiento(){
  //   this.servicio.getMantenimiento().subscribe(
  //     result => {
  //       this.mantenimientos = result[0].mantenimiento;
  //       //si mantenimiento tiene el valor de 1 en la BD va a la ruta /mantenimiento
  //       if(this.mantenimientos===1){
  //         this.router.navigate(['/mantenimiento']);
  //       }else{
  //         const currentUserSoluna=localStorage.getItem('currentUserSoluna');

  //         //si currentUserSoluna existe y no esta vacio puede navegar, sino no pasara de inicio
  //         if(currentUserSoluna!=null && currentUserSoluna!==''){

  //         }else{
  //           this.router.navigate(['/login']);
  //         }
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  ngOnInit() {
    // this.getMantenimiento();
  }
}
