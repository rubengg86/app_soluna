import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { BotonComprarPage } from '../../boton-comprar/boton-comprar.page';
import { ServicioService } from '../../../../services/servicio.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  providers: [ServicioService]
})
export class TicketsPage implements OnInit {


/*-------- Día y mes Actual ---------*/
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();

  public centros;
  public idCentro;
  public fechaElegida:any = new Date();
  public fechaClaseTicket;
  public diaSemana;
  public fechaString;
  public cliente;
  public tickets;
  public reserva_id;
  public ticket_reserva;

  public loading = false;
  


  
  ticket=true;

  /*--------------------------------CALENDARIO FLATPICKR---------------------------- */
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: false,
    mode: 'single',
    dateFormat: 'Y-m-d',locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      },
      months: {
      shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      }
    },
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  constructor(public modalController: ModalController, private _service: ServicioService) { }

  buscarCentros() {

    this._service.getCenters().subscribe( result => {

      this.centros = result;
      // console.log(this.centros);

      this.getCliente();

    }, error => {
      console.log(<any>error);
    })
  }

  getCliente() {

    // this._service.getCustomerById(this.customer_id).subscribe( res => {
    this._service.getCustomerById(5211).subscribe( res => {

      this.cliente = res[0];
      // console.log(this.cliente);
      this.idCentro = this.cliente.center_id;

      this.buscarTicketsAComprar();
    }, error =>{
      console.log(error);
    })
  }

  buscarTicketsAComprar() {

    this.loading = true

    setTimeout(() => {
      
      this.fechaElegida.setHours(0)
      this.fechaElegida.setMinutes(0)
      this.fechaElegida.setSeconds(0)
      let fecha = (this.fechaElegida)/1000 | 0;
      // console.log(this.fechaElegida);
      // console.log(fecha);
   
      this.tickets = [];
   
      this._service.getTicketsAvailableOnDate(fecha, this.idCentro).subscribe( res => {
      this.tickets = res;
      // console.log(this.tickets);
   
      // Para mostrar la fecha en el html hay que poner una hora que no sean las 00:00
      // porque entonces pone el día anterior
      this.fechaElegida.setHours(3);
      this.fechaString = this.fechaElegida.toISOString().slice(0,10);

      this.getDiaSemana();

      this.loading = false;
   
      }, error => {
        console.log(<any>error);
      })
 
    }, 100);

  }

  getDiaSemana() {

    switch(this.fechaElegida.toString().slice(0,3).toUpperCase()) {
      case 'MON': {
        this.diaSemana = 'Lunes';
        break
      }
      case 'TUE': {
        this.diaSemana = 'Martes';
        break
      }
      case 'WED': {
        this.diaSemana = 'Miércoles';
        break
      }
      case 'THU': {
        this.diaSemana = 'Jueves';
        break
      }
      case 'FRI': {
        this.diaSemana = 'Sábado';
        break
      }
      case 'SAT': {
        this.diaSemana = 'Domingo';
        break
      }
      case 'SUN': {
        this.diaSemana = 'Domingo';
        break
      }
    }
  }

  ngOnInit() {
    this.buscarCentros();

    // console.log(220104105724);
    // let a = new Date(2022, 0, 4, 11, 57, 24).toISOString();
    // console.log(a);
    // console.log(a.slice(2,4)+a.slice(5,7)+a.slice(8,10)+a.slice(11,13)+a.slice(14,16)+a.slice(17,19));
 
  }

  /*--------------------------------MODAL BOTONES COMPRAR ---------------------------- */
  // async comprarModal(activity_id, center_id, group_id, amount, ticket_type) {
  comprarModal(activity_id, center_id, group_id, amount, ticket_type) {
    

    // Revertimos el cambio de hora
    this.fechaElegida.setHours(0);
    this.fechaClaseTicket = (this.fechaElegida)/1000 | 0;

    let idReserva = localStorage.getItem('soluna_reserve_id');
    let idGrupo = localStorage.getItem('soluna_group_id');
    let idDate = localStorage.getItem('soluna_class_date');

    let get_date_id = group_id + '_' + this.fechaClaseTicket;
    let session_date_id = idGrupo + '_' + idDate;

    // console.log(get_date_id);
    // console.log(session_date_id);

    if((get_date_id !== session_date_id) && idReserva) {
      this._service.getTicketDeletePreReserve(idReserva).subscribe();
    }

    this._service.getTicketCreatePreReserve(this.fechaClaseTicket, activity_id, center_id, group_id, amount, ticket_type).subscribe( (res:any) => {

      this.ticket_reserva = res;
      // idReserva = res.id;
      // console.log(idReserva);
      this.reserva_id = res.id;
      // console.log(this.reserva_id);
      localStorage.setItem('soluna_reserve_id', res.id);
      localStorage.setItem('soluna_group_id', group_id);
      localStorage.setItem('soluna_class_date', this.fechaClaseTicket);

      this.abrirModal();
    });

    // Esto funcionaba pero a saber si se ejecuta siempre antes de 200
    // setTimeout(async() => {
    //   const modal = await this.modalController.create({
    //     component: BotonComprarPage,
    //     componentProps: { 
    //       ticket_id: idReserva,
    //       bar: 'world'
    //     }
    //   });
    //   // return await setTimeout(() => { modal.present(); }, 100);
    //   return await modal.present();
    // }, 200)

    // Antes del timeout
    // const modal = await this.modalController.create({
    //   component: BotonComprarPage,
    //   componentProps: { 
    //     ticket_id: idReserva,
    //     bar: 'world'
    //   }
    // });
    // return await modal.present();
  }

  async abrirModal() {

    const modal = await this.modalController.create({
      component: BotonComprarPage,
      componentProps: { 
        ticket: this.ticket_reserva,
      }
    });

    return await modal.present();

  }





}
