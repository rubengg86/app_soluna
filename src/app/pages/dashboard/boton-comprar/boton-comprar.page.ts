import { ModalController, AlertController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodigoComponent } from './codigo/codigo.component';
import * as cryptojs from 'crypto-js';
import * as moment from 'moment';
import { ServicioService } from '../../../services/servicio.service';
import { GLOBAL } from '../../../services/global';
import { NgForm } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.page.html',
  styleUrls: ['./boton-comprar.page.scss'],
})
export class BotonComprarPage implements OnInit {
  @ViewChild('testForm') testFormElement: ElementRef;

  // public customer_id = localStorage.getItem('currentUserSoluna');
  public customer_id = localStorage.getItem('currentUserSoluna');
  tarjeta=false;
  paypal=false;
  merchantParams;
  signature;

  // Variables que vienen al crear el modal
  ticket;
  diaSemana;
  fechaString;
  reserve_id;
  group_id;
  class_date;
  loading = false;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Cerrar',
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  constructor(public modalController: ModalController, 
              private service: ServicioService, 
              private alertController: AlertController,
              private iab: InAppBrowser) { }

  ngOnInit() {
    console.log(this.ticket)
    this.reserve_id = localStorage.getItem('soluna_reserve_id');
    this.group_id = localStorage.getItem('soluna_group_id');
    this.class_date = localStorage.getItem('soluna_class_date');

    // this.generatemerchantparams();

    // console.log((<HTMLFormElement>document.getElementById('id_formulario')['Ds_MerchantParameters'].value));
    // document.getElementById('id_formulario')['Ds_MerchantParameters'].value = 'sdfkasdf';
    // console.log((<HTMLFormElement>document.getElementById('id_formulario')['Ds_MerchantParameters'].value));


  }

  
  change(event){
    const radio=event.target.id;
    if(radio==='tarjeta'){
      this.tarjeta=true;
      this.paypal=false;
    }else if (radio==='paypal'){
      this.tarjeta=false;
      this.paypal=true;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async codigoModal() {
    const modal = await this.modalController.create({
      component: CodigoComponent
    });
    return await modal.present();
  };

  generatemerchantparams() {
    this.loading = true;

    let price = +this.ticket.price * 100;
    let order = moment().format('YYMMDDHHmmss');

    let hash1 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'1').toString();
    let hash2 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'2').toString();
      
    let tpvdata = {
      "DS_MERCHANT_AMOUNT": price.toString(),
      "DS_MERCHANT_CURRENCY": "978",
      "DS_MERCHANT_MERCHANTCODE": "355780867",
      "DS_MERCHANT_ORDER": order,
      "DS_MERCHANT_TERMINAL": "1",
      "DS_MERCHANT_TRANSACTIONTYPE": "0",
      // "DS_MERCHANT_URLKO": "https://solunapilates.es/finish-app-true.php",
      // "DS_MERCHANT_URLOK": "https://solunapilates.es/finish-app-true.php"
      "DS_MERCHANT_URLKO": "https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash2,
      "DS_MERCHANT_URLOK": "https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash1
    }

    // Base64 encoding of parameters
    var merchantWordArray = cryptojs.enc.Utf8.parse(JSON.stringify(tpvdata));
    this.merchantParams = merchantWordArray.toString(cryptojs.enc.Base64);
    // document.getElementById('id_formulario')['Ds_MerchantParameters'].value = merchantWordArray.toString(cryptojs.enc.Base64);
    
    // Decode key
    var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD);
    // var keyWordArray = cryptojs.enc.Base64.parse(merchant_key);
    
    // Generate transaction key
    var iv = cryptojs.enc.Hex.parse("0000000000000000");
    var cipher = cryptojs.TripleDES.encrypt(tpvdata.DS_MERCHANT_ORDER, keyWordArray, {
      iv:iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.ZeroPadding
    });
    
    // Sign
    var signature = cryptojs.HmacSHA256(this.merchantParams, cipher.ciphertext);
    this.signature = signature.toString(cryptojs.enc.Base64);
    // document.getElementById('id_formulario')['Ds_Signature'].value = signature.toString(cryptojs.enc.Base64);
    
    // Done, we can return response
    var response = {
      signatureVersion: "HMAC_SHA256_V1",
      merchantParameters: this.merchantParams,
      signature: this.signature
    };
    // console.log(response);

    // let pageContent = '<html><head></head><body><form id="form2" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="post">' +
    // '<input type="hidden" name="Ds_MerchantParameters" value="' + this.merchantParams + '">' +
    // '<input type="hidden" name="Ds_Signature" value="' + this.signature + '">' +
    // '<input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1">' +
    // '</form> <script type="text/javascript">document.getElementById("form2").submit();</script></body></html>';
    let pageContent = '<html><head></head><body><form id="form2" action="https://sis.redsys.es/sis/realizarPago" method="post">' +
    '<input type="hidden" name="Ds_MerchantParameters" value="' + this.merchantParams + '">' +
    '<input type="hidden" name="Ds_Signature" value="' + this.signature + '">' +
    '<input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1">' +
    '</form> <script type="text/javascript">document.getElementById("form2").submit();</script></body></html>';
    let pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
    
    // let browserRef = window.cordova.InAppBrowser.open(
    //     pageContentUrl ,
    //     "_blank",
    //     "hidden=no,location=no,clearsessioncache=no,clearcache=no"
    // );


    this.service.getTicketPaymentCreate(this.customer_id, order, price/100, this.reserve_id).subscribe(res => {
      this.loading = false;

      // console.log("https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash1)
      // console.log("https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash2)

      const browserRef = this.iab
      .create(
        pageContentUrl,
        '_blank',
        this.options
      );
    });


    
      // Esto es para hacer que se cierre solo al llegar a la web de soluna
    // browserRef.on('loadstop').subscribe(event => {
    //   // console.log('loadstop started');
    //   // console.log(event);
    //   // console.log('loadstop url', event.url);
    
    //   if (event.url == "https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash1) {
    //     // console.log(JSON.stringify(event));

    //     this.service.getTicketPaymentUpdate(order, '1', hash1).subscribe(res => {
    //       console.log(res);
    //       this.presentAlert('¡Tu compra se ha confirmado con éxito!');
    //     });


    //     browserRef.close();
    //   } else if (event.url == "https://solunapilates.es/finish-app-true.php?order="+order+"&type="+"T"+"&hash="+hash2) {

    //     browserRef.close();

    //   }
    
    // });


    // Esto era el método antiguo
    // setTimeout(() => {
    //   this.pruebaPago(order, price, response);
    // }, 10);




  }


  pruebaPago(order, price, response) {
  // pruebaPago() {

    this.service.getTicketPaymentCreate(this.customer_id, order, price/100, this.reserve_id).subscribe(res => {
      (<HTMLFormElement>document.getElementById('id_formulario')).submit();
      this.loading = false;
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


}
