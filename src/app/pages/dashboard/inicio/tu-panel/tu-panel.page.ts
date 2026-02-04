import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { EditarTusDatosPage } from './editar-tus-datos/editar-tus-datos.page';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ServicioService } from '../../../../services/servicio.service';
import * as cryptojs from 'crypto-js';
import * as moment from 'moment';
import { GLOBAL } from '../../../../services/global';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-tu-panel',
  templateUrl: './tu-panel.page.html',
  styleUrls: ['./tu-panel.page.scss','./tu-panel.page.css'],
})



export class TuPanelPage implements OnInit{

/*-------- Mes y año Actual ---------*/
  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth();

  public customer_id = localStorage.getItem('currentUserSoluna');
  // public customer_id = 56;
  // public customer_id = 5211;
  // public customer_id = 5825;
  // public customer_id = 27;
  // public customer_id = 6406;
  // public customer_id = 6391;
  public asistencia;
  public cliente;
  public pagosCliente;
  public fechaFiltro;
  public pagosFiltrados:any = [];
  public cuota;
  public pagar = false;
  public pagado = false;

  public pagos;
  // public options;
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
  merchantParams;
  signature;


  constructor(public modalController: ModalController,
              private calendar: NgbCalendar,
              private _service: ServicioService,
              private iab: InAppBrowser) {}


 /*--------------------------------------------GRAFICO------------------------------------------- */
 public lineChartData: ChartDataSets[] = [
  //{ data: [0, 10, 20, 30, 45.5, 45.5, 30, 20, 10, 10, 10, 20], label: 'Asistencia'},
  { data: [0, 20, 30, 35, 40, 35, 35, 30, 30, 20, 35, 30], label: 'Pagos' },
    { data: [0, 10, 30, 35, 10, 35, 35, 30, 30, 20, 35, 30], label: 'Bonos' },
      { data: [0,0,0,0,0,0,0,35, 0,0,30], label: 'Tickets' },
];
public lineChartLabels: Label[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
public lineChartOptions: any = {
  responsive: true
};

public lineChartColors: Array<any> = [
  { // verde
    backgroundColor: 'transparent',
    borderColor: '#1A6E26',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  },
  { // morado
    backgroundColor: 'transparent' ,
    borderColor: '#59137D',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  },
  { // rojo
    backgroundColor: 'transparent' ,
    borderColor: '#FF6C6C',
    pointBackgroundColor: 'transparent',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointHoverBorderColor: 'transparent'
  }
];
lineChartLegend = true;
lineChartType: ChartType = 'line';


  /*--------------------------------CALENDARIO------------------------- */
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: true,
    mode: 'single',
    dateFormat: 'Y-m-d',
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  modalDataResponse: any;

  public previsualizacion: string;
  sanitizer: any;



  /*----------------------------------MODAL EDITAR------------------------- */
  async editarModal() {
    const modal = await this.modalController.create({
      component: EditarTusDatosPage
    });
    return await modal.present();
  };
  /*----------------------------------MODAL BOTON COMPRAR------------------------- */
  async comprarModal() {
    const modal = await this.modalController.create({
      component: BotonComprarPage
    });
    return await modal.present();
  }

/*------------------- OBTENER DÍA ACTUAL -------------------*/

 model: NgbDateStruct;
  date: {year: number, month: number};

    selectToday() {
        this.model = this.calendar.getToday();
      }

/*------------------- OBTENER CLIENTE -------------------*/
  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
      this.cliente = res[0];
      console.log(res[0]);
      this.getAsistencia();
      this.getPagos();
      this.getCuota();
    }, error =>{
      console.log(error);
    })
  }

  getAsistencia() {

    this._service.getAsssistanceById(this.customer_id).subscribe( res => {
      this.asistencia = res;
    }, error =>{
      console.log(error);
    })
  }

  getPagos() {
    this._service.getLastPayments(this.customer_id).subscribe( res => {
      // console.log(res);
      this.pagosCliente = res;
      this.pagosFiltrados = res;
    }, error =>{
      console.log(error);
    })
  }

  getCuota() {
    this._service.getBillUser(this.customer_id, this.cliente.center_id).subscribe ( res => {
      // console.log(res);
      this.cuota = res;
      let price = (+this.cuota.total + this.cuota.extra_payments.total)*100;
      if (price != 0) {
        if(!this.cuota.payed_this_month) {
          this.pagar=true;
        } else {
          this.pagado = true;
        }
      }
    }, error =>{
      console.log(error);
    })
  }

/*------------------- FILTRO CLIENTE -------------------*/
  comprobarFecha() {
    // console.log(this.fechaFiltro);

    this.pagosFiltrados = [];
    let contadorFiltroPagos = 0;
    for (let i = 0; i < this.pagosCliente.length; i++) {

      if (this.fechaFiltro === this.pagosCliente[i].date.slice(0,7)) {
        this.pagosFiltrados[contadorFiltroPagos] = this.pagosCliente[i]
        contadorFiltroPagos++;
      }
    }
  }

  generatemerchantparams() {

    let price = (+this.cuota.total + this.cuota.extra_payments.total)*100;
    let order = moment().format('YYMMDDHHmmss');

    let merchantCode;
    let url;

    if(this.cliente.center_id == "5"){
      console.log('Aviles')

      url = "https://sis.redsys.es/sis/realizarPago";
      merchantCode = "355780867";
      var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD_AVILES);

    } else if (this.cliente.center_id == "9") {
      console.log('Gijon')

      // url = "https://sis-t.redsys.es:25443/sis/realizarPago";
      url = "https://sis.redsys.es/sis/realizarPago";
      merchantCode = "363064700";
      // var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_TEST_GIJON);
      var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD_GIJON);

    } else if (this.cliente.center_id == "1") {
      console.log('La Florida')

      // url = "https://sis-t.redsys.es:25443/sis/realizarPago";
      url = "https://sis.redsys.es/sis/realizarPago";
      merchantCode = "352828222";
      var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD_FLORIDA);

    } else {
      console.log('Default')

      url = "https://sis.redsys.es/sis/realizarPago";
      merchantCode = "355780867";
      var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD_AVILES);

    }


    let hash1 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'1').toString();
    let hash2 = cryptojs.SHA1(order+GLOBAL.PASSWD_SEED+GLOBAL.PASSWD_SEED+order+'2').toString();
    let urlok = "https://solunapilates.es/finish-app-true.php?order="+order+'&type='+'M'+'&hash='+hash1;


    /** Ruben refactor: TODO change DS_MERCHANT_MERCHANTURL to proper TPV callback */
    let tpvdata = {
      "DS_MERCHANT_AMOUNT": price.toString(),
      "DS_MERCHANT_CURRENCY": "978",
      "DS_MERCHANT_MERCHANTCODE": merchantCode,
      "DS_MERCHANT_ORDER": order,
      "DS_MERCHANT_TERMINAL": "1",
      "DS_MERCHANT_TRANSACTIONTYPE": "0",
      "DS_MERCHANT_MERCHANTURL": "https://solunapilates.es/finish-app-true.php?order="+order+'&type='+'M'+'&hash='+hash1,
      "DS_MERCHANT_URLOK": "https://solunapilates.es/finish-app-true.php?order="+order+'&type='+'M'+'&hash='+hash1,
      "DS_MERCHANT_URLKO": "https://solunapilates.es/finish-app-true.php?order="+order+'&type='+'M'+'&hash='+hash2
    }



    // Base64 encoding of parameters
    var merchantWordArray = cryptojs.enc.Utf8.parse(JSON.stringify(tpvdata));
    this.merchantParams = merchantWordArray.toString(cryptojs.enc.Base64);
    // document.getElementById('id_formulario')['Ds_MerchantParameters'].value = merchantWordArray.toString(cryptojs.enc.Base64);

    // Decode key
    // Pruebas
    // var keyWordArray = cryptojs.enc.Base64.parse('sq7HjrUOBfKmC576ILgskD5srU870gJ7');
    // var keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.SHA256_PROD_AVILES);
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

    let pageContent = '<html><head></head><body><form id="form2" action='+url+' method="post">' +
    '<input type="hidden" name="Ds_MerchantParameters" value="' + this.merchantParams + '">' +
    '<input type="hidden" name="Ds_Signature" value="' + this.signature + '">' +
    '<input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1">' +
    '</form> <script type="text/javascript">document.getElementById("form2").submit();</script></body></html>';

    let pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);


    // const link = document.createElement("a")
    // link.href = pageContentUrl;
    // link.click()

    this._service.getMonthlyPaymentCreate(this.customer_id, this.cliente.center_id, order).subscribe(res => {
      const browserRef = this.iab
      .create(
        pageContentUrl,
        '_blank',
        this.options
      );
    });


  }

  pruebaPago(order, price, urlok) {

    this._service.getMonthlyPaymentCreate(this.customer_id, this.cliente.center_id, order).subscribe(res => {
      (<HTMLFormElement>document.getElementById('id_formulario')).submit();

      // this._service.getMonthlyPaymentUpdate(order, '1').subscribe(res => {
      //   console.log(res);
      //   // this.presentAlert('¡Tu compra se ha confirmado con éxito!');
      // });

      // console.log(urlok);

    });

    // (<HTMLFormElement>document.getElementById('id_formulario')).submit();
    // console.log((<HTMLFormElement>document.getElementById('id_formulario')).elements);
  }

  ngOnInit(): void {
      this.getCliente();
  }


}
