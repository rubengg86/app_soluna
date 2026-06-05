import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { EditarTusDatosPage } from './editar-tus-datos/editar-tus-datos.page';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ServicioService } from '../../../../services/servicio.service';
import { RefreshService } from '../../../../services/refresh.service';
import * as cryptojs from 'crypto-js';
import * as moment from 'moment';
import { GLOBAL } from '../../../../services/global';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-tu-panel',
  templateUrl: './tu-panel.page.html',
  styleUrls: ['./tu-panel.page.scss','./tu-panel.page.css'],
})



export class TuPanelPage implements OnInit, OnDestroy {
  private browserSub: Subscription;
  private exitSub: Subscription;
  private refreshSub: Subscription;
  private paymentResult: 'ok' | 'ko' | null = null;

/*-------- Mes y año Actual ---------*/
  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth();

  public customerId = localStorage.getItem('currentUserSoluna');//6249;//localStorage.getItem('currentUserSoluna');
  public asistencia;
  public cliente;
  public fechaFiltro;
  public pagosFiltrados: any = [];
  public cuota;
  public pagar = false;
  public pagado = false;

  public pagos;
  // public options;
  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom : 'no',
    hardwareback : 'no',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no',
    disallowoverscroll : 'no',
    toolbar : 'no',
    enableViewportScale : 'no',
    allowInlineMediaPlayback : 'no',
    presentationstyle : 'fullscreen',
    fullscreen : 'yes',
  };
  merchantParams: string;
  signature: string;

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
  public previsualizacion: string;
  sanitizer: any;

  model: NgbDateStruct;
  date: {year: number; month: number};


  constructor(
    public modalController: ModalController,
    private calendar: NgbCalendar,
    private service: ServicioService,
    private iab: InAppBrowser,
    private toastController: ToastController,
    private refreshService: RefreshService
  ) {}


/*------------------- OBTENER DÍA ACTUAL -------------------*/

  selectToday() {
    this.model = this.calendar.getToday();
  }

/*------------------- OBTENER CLIENTE -------------------*/
  getCliente() {

    this.service.getCustomerById(this.customerId).subscribe(res => {
      this.cliente = res[0];
      console.log(res[0]);
      this.getAsistencia();
      this.getPagos();
      this.getCuota();
    }, error =>{
      console.log(error);
    });
  }

  getAsistencia() {

    this.service.getAsssistanceById(this.customerId).subscribe(res => {
      this.asistencia = res;
    }, error =>{
      console.log(error);
    });
  }

  getPagos() {
    this.service.getLastPayments(this.customerId).subscribe(res => {
      this.pagosFiltrados = (res as any[]).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }, error =>{
      console.log(error);
    });
  }

  getCuota() {
    this.service.getBillUser(this.customerId, this.cliente.center_id).subscribe (res => {
      // console.log(res);
      this.cuota = res;
      console.log(this.cuota);
      const price = (+this.cuota.total + this.cuota.extra_payments.total)*100;
      if (price != 0) {
        if(!this.cuota.payed_this_month) {
          this.pagar=true;
        } else {
          this.pagado = true;
        }
      }
    }, error =>{
      console.log(error);
    });
  }

  generateMerchantParams() {

    const price = (+this.cuota.total + this.cuota.extra_payments.total)*100;
    const order = moment().format('YYMMDDHHmmss');

    const url = GLOBAL.tpvUrl;
    const centerId = parseInt(this.cliente.center_id, 10);
    const merchantCode = GLOBAL.merchants[centerId].merchantCode;
    const keyWordArray = cryptojs.enc.Base64.parse(GLOBAL.merchants[centerId].sha);

    const baseUrl = GLOBAL.solunaUrl + '/finish-app-true.php';

    /* eslint-disable @typescript-eslint/naming-convention */
    const tpvdata = {
      DS_MERCHANT_AMOUNT: price.toString(),
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_MERCHANTCODE: merchantCode,
      DS_MERCHANT_ORDER: order,
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_MERCHANTURL: baseUrl + '?type=M&order=' + order,
      DS_MERCHANT_URLOK:       baseUrl + '?app_result=ok',
      DS_MERCHANT_URLKO:       baseUrl + '?app_result=ko'
    };
    /* eslint-enable @typescript-eslint/naming-convention */

    // Base64 encoding of parameters
    const merchantWordArray = cryptojs.enc.Utf8.parse(JSON.stringify(tpvdata));
    this.merchantParams = merchantWordArray.toString(cryptojs.enc.Base64);

    // Generate transaction key
    const iv = cryptojs.enc.Hex.parse('0000000000000000');
    const cipher = cryptojs.TripleDES.encrypt(tpvdata.DS_MERCHANT_ORDER, keyWordArray, {
      iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.ZeroPadding
    });
    console.log(cryptojs.enc.Base64.parse(GLOBAL.merchants[centerId].sha));
    console.log(GLOBAL.merchants[centerId].sha);
    console.log(JSON.stringify(tpvdata));

    // Sign
    const signature = cryptojs.HmacSHA256(this.merchantParams, cipher.ciphertext);
    this.signature = signature.toString(cryptojs.enc.Base64);

    // // Done, we can return response
    // const response = {
    //   signatureVersion: 'HMAC_SHA256_V1',
    //   merchantParameters: this.merchantParams,
    //   signature: this.signature
    // };
    // // console.log(response);

    const pageContent = '<html><head></head><body><form id="form2" action='+url+' method="post">' +
    '<input type="hidden" name="Ds_MerchantParameters" value="' + this.merchantParams + '">' +
    '<input type="hidden" name="Ds_Signature" value="' + this.signature + '">' +
    '<input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1">' +
    '</form> <script type="text/javascript">document.getElementById("form2").submit();</script></body></html>';

    const pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

    this.paymentResult = null;

    this.service.getMonthlyPaymentCreate(this.customerId, this.cliente.center_id, order).subscribe(res => {
      const browserRef = this.iab.create(pageContentUrl, '_blank', this.options);

      this.browserSub = browserRef.on('loadstart').subscribe(event => {
        if (event.url && event.url.includes('finish-app-true.php')) {
          this.browserSub?.unsubscribe();
          if (event.url.includes('app_result=ok')) {
            this.paymentResult = 'ok';
            this.getPagos();
            this.getCuota();
          } else {
            this.paymentResult = 'ko';
          }
          browserRef.close();
        }
      });

      this.exitSub = browserRef.on('exit').subscribe(() => {
        this.exitSub?.unsubscribe();
        this.browserSub?.unsubscribe();
        this.showPaymentToast(this.paymentResult);
      });
    });


  }

  pruebaPago(order, price, urlok) {

    this.service.getMonthlyPaymentCreate(this.customerId, this.cliente.center_id, order).subscribe(res => {
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

  formatDateSpanish(dateString: string): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const fecha = new Date(dateString);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${dia} de ${mes} de ${anio}`;
  }

  ngOnInit(): void {
    this.refreshSub = this.refreshService.refresh$.subscribe(() => this.getCliente());
  }

  ionViewWillEnter(): void {
    this.getCliente();
  }

  private async showPaymentToast(result: 'ok' | 'ko' | null) {
    const config = result === 'ok'
      ? { message: '¡Pago realizado con éxito!', color: 'success', icon: 'checkmark-circle-outline' }
      : result === 'ko'
      ? { message: 'El pago no se ha podido completar', color: 'danger', icon: 'close-circle-outline' }
      : { message: 'Pago cancelado', color: 'medium', icon: 'information-circle-outline' };

    const toast = await this.toastController.create({
      ...config,
      duration: 3500,
      position: 'bottom',
    });
    await toast.present();
  }

  ngOnDestroy(): void {
    this.browserSub?.unsubscribe();
    this.exitSub?.unsubscribe();
    this.refreshSub?.unsubscribe();
  }
}
