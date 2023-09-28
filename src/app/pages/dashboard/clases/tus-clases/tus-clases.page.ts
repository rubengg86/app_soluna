import { Component, OnInit } from '@angular/core';

import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { ServicioService } from '../../../../services/servicio.service';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CambiarClasePage } from './cambiar-clase/cambiar-clase.page';
import { AnularClasePage } from './anular-clase/anular-clase.page';
import { ClasesMes } from '../../../../models/clases-mes';
import { RecuperarClasePage } from './recuperar-clase/recuperar-clase.page';
import * as moment from 'moment';

@Component({
  selector: 'app-tus-clases',
  templateUrl: './tus-clases.page.html',
  styleUrls: ['./tus-clases.page.scss'],
})
export class TusClasesPage implements OnInit {

  clases=false;


    /*-------------------------------------------CALENDARIO------------------------------------------ */
  public datePickerOptions: FlatpickrDefaultsInterface= {
    allowInput: true,
    enableTime: false,
    mode: 'single',
    inline:true,
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
    minDate: new Date(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0),
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0) }]
    // enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  public customer_id = localStorage.getItem('currentUserSoluna');
  // public customer_id = 5254; // esta es prueba programador
  // public customer_id = 56; // esta es la maria
  // public customer_id = 19;
  // public customer_id = 3274;
  // public customer_id = 2534;
  // public customer_id = 5211;
  // public customer_id = 4841;
  // public customer_id = 4892;
  // public customer_id = 5384; //clase lunes miercoles y aparte viernes
  // public customer_id = 5686; //usuario con actividad de 2h pero 1 dia solo seleccionado (en este caso solo lunes)
  // public customer_id = 2495; //fallos al cambiar clase y recuperar (sale blanco)
  // public customer_id = 5462; //fallos al cambiar clase y recuperar (sale blanco)
  // public customer_id = 5721; //Al cambiar clase, el dia de la clase nueva pone que no tiene clase
  // public customer_id = 3715; //No sale junio, directamente julio
  // public customer_id = 4146; //No le salen sus clases
  public cliente;
  public clasesMes: Array<ClasesMes>;
  public clasesMesSiguiente: Array<ClasesMes>;
  public clasesTotales;
  public actividades;
  public actividadDia;
  public asistencias;
  public noAsistencia;
  public sinAsistir;
  public huecos;
  public recuperables;
  public recuperablesDetalle;
  public recuperablesNumero;
  public counts;
  public fechasLibres;
  public fechaAntigua;
  public grupoAntiguo;
  public inicioAntiguo;
  public ticketDia;
  public dia1InglesTicket;
  public dia2InglesTicket;
  public diaACambiar;
  public tickets;
  public fechaElegida;
  public fechaClaseTicket;
  public colapsar = false;

  constructor(private _service: ServicioService, public modalController: ModalController) { }

  ngOnInit() {
    this.getCliente();
    this.getActividadesCliente();
    this.getTicketsCliente();
    
  }

  // get fechaString() {
  //   if(this.fechaElegida) {
  //     let fecha = new Date( this.fechaElegida );
  //     fecha.setHours(5);
  //     return fecha.toISOString().slice(0, 10);
  //   } else {
  //     return null
  //   }
  // }

  get fechaIgual() {
    if ( this.fechaElegida && this.sinAsistir){
      // console.log(+this .fechaElegida.getTime());
      let contador = 0
      this.actividadDia = [];
      this.diaACambiar = null;
      let iguales = false;
      for (let i = 0; i < this.clasesTotales.length; i++) {
        if ((+this.clasesTotales[i].tiempo*1000) == +this.fechaElegida.getTime()) {
          this.actividadDia[contador] = this.clasesTotales[i];
          this.diaACambiar = this.fechaElegida;
          iguales = true;
          contador++;
          return iguales
        }
      }
      // for (let i = 0; i < this.actividades.length; i++) {
      //   if (this.actividades[i].days.day_1.slice(0,3).toUpperCase() === this.fechaElegida.toString().slice(0,3).toUpperCase() || this.actividades[i].days.day_2.slice(0,3).toUpperCase() === this.fechaElegida.toString().slice(0,3).toUpperCase()) {
      //     this.actividadDia[contador] = this.actividades[i];
      //     this.diaACambiar = this.fechaElegida;
      //     contador++;
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    } else {
      return false;
    }
  }

  get fechaIgualTickets() {
    if ( this.fechaElegida && this.tickets ){
      let contador = 0
      this.ticketDia = [];
      for (let i = 0; i < this.tickets.length; i++) {
        // if (this.dia1InglesTicket[i] === this.fechaElegida.toString().slice(0,3).toUpperCase() || this.dia2InglesTicket[i] === this.fechaElegida.toString().slice(0,3).toUpperCase()) {
        //   this.ticketDia[contador] = this.tickets[i];
        //   contador++;
        //   return true
        // } else {
        //   return false
        // }
        let fechaTicket = new Date(+(this.tickets[0].class_date)*1000);
        if (this.fechaElegida.toString() === fechaTicket.toString()) {
          this.ticketDia[contador] = this.tickets[i];
          contador++;
          return true
        } else {
          return false
        }
      }
    } else {
      return false;
    }
  }

  getCliente() {
    this._service.getCustomerById(this.customer_id).subscribe( res => {

      this.cliente = res[0];
      // console.log(this.cliente);

    }, error =>{
      console.log(error);
    })
  }

  getActividadesCliente () {
    this._service.getCustomerActivity(this.customer_id).subscribe( res => {

      this.actividades = res;
      // console.log(this.actividades);

      this.getAsistencias();
      this.getRecoverableClasses();

    }, error =>{
      console.log(error);
    })
  }

  getRecoverableClasses() {

    this.recuperablesNumero = [];
    this.counts = {};

    this._service.getRecoverableClasses(this.customer_id).subscribe( (res:any) => {
      // console.log(res);
      this.recuperablesDetalle = res;

      // console.log(moment().add(-2, 'months').format('DD/MM/YYYY'))

      res.forEach(element => {

        if (this.actividades) {
          this.actividades.forEach(actividad => {


            // console.log(actividad)
            // console.log(actividad.group_id == element.date_id.split('_')[0]);


            if (element.redeemed == 0) {
              if (actividad.group_id == element.date_id.split('_')[0] && moment(element.remove_date).valueOf() > moment().add(-2, 'months').valueOf()) {
                // console.log(element)
                // console.log(moment(element.remove_date).format("DD/MM/YYYY"))

                if (actividad.recoverable_number) {
                  actividad.recoverable_number++;
                } else {
                  actividad.recoverable_number = 1;
                }
              }
            }
          });
        }
        
      });


    })

    this._service.getRecoverableClassesNumber(this.customer_id).subscribe( res => {
      // console.log(res);
      this.recuperables = res;
    })
  }

  getAsistencias() {
    this._service.getCustomerAssistances(this.customer_id).subscribe( res => {

      this.asistencias = res;
      // console.log(this.asistencias);

      if (this.actividades) {
        this.getProximasClases();
      }

    })
  }


  getProximasClases() {

    this.clasesTotales = [];

    let mesActual = new Date();
    let mesSiguiente = new Date(mesActual.getFullYear(), mesActual.getMonth() + 2, 0);
    let day_target;


    for (let i = 0; i < this.actividades.length; i++) {
      let dias = [];
      let contador = 0;
      for (let dia in this.actividades[i].days) {
        dias[contador] = dia;
        contador++;
      }

      this.clasesMes = [];
      this.clasesMesSiguiente = [];  

      for (let j = 0; j < dias.length; j++) {
        switch (this.actividades[i].days[dias[j]].toLowerCase()) {
          case 'monday':
            day_target=1;
          break;
          case 'tuesday':
            day_target=2;
          break;
          case 'wednesday':
            day_target=3;
          break;
          case 'thursday':
            day_target=4;
          break;
          case 'friday':
            day_target=5;
          break;
          case 'saturday':
            day_target=6;
          break;
          case 'sunday':
            day_target=0;
          break;
        }

        // Mes actual
        for (let k = 1; k <= 31; k++) {

          let timestampdate = new Date(mesActual.getFullYear(), mesActual.getMonth(), k)

          // Para no pasarnos de mes y estar en el mismo
          if (timestampdate.getMonth() == mesActual.getMonth()) {

            if (timestampdate.getDay() == 0 || timestampdate.getDay() <= 6) {

              if (timestampdate.getDay() == day_target){

                // Para poner el mes y el dia con 0 delante si es una cifra
                let mes;
                if ((+timestampdate.getMonth()+1).toString().length >= 2){
                  mes = (+timestampdate.getMonth()+1)
                } else if ((+timestampdate.getMonth()+1).toString().length == 1){
                  mes = '0'+(+timestampdate.getMonth()+1)
                }

                let d;
                if ((+timestampdate.getDate()).toString().length >= 2){
                  d = (+timestampdate.getDate())
                } else if ((+timestampdate.getDate()).toString().length == 1){
                  d = '0'+(+timestampdate.getDate())
                }

                // console.log(timestampdate.getDay(), timestampdate.getDay() == this.actividades[i].dayselect || this.actividades[i].dayselect == 0);
                if (timestampdate.getDay() == this.actividades[i].dayselect || this.actividades[i].dayselect == 0) {
                  this.clasesMes.push({
                    fecha: d + '/' + mes,
                    tiempo: timestampdate.getTime()/1000 | 0,
                    hora_inicio: this.actividades[i].start_time,
                    actividad: this.actividades[i].activity_name,
                    centro: this.actividades[i].center_name,
                    profesor: this.actividades[i].teacher_name,
                    id_grupo: this.actividades[i].group_id,
                    id_centro: this.actividades[i].center_id,
                    id_actividad: this.actividades[i].activity_id,
                    cambiada: false
                  })
                }
              }

            }

          }
          
        }

        // Siguiente mes
        for (let k = 1; k <= 31; k++) {

          let timestampdate = new Date(mesSiguiente.getFullYear(), mesSiguiente.getMonth(), k)

          if (timestampdate.getMonth() == mesSiguiente.getMonth()) {

            if (timestampdate.getDay() == 0 || timestampdate.getDay() <= 6) {

              if (timestampdate.getDay() == day_target){

                let mes;
                if ((+timestampdate.getMonth()+1).toString().length >= 2){
                  mes = (+timestampdate.getMonth()+1)
                } else if ((+timestampdate.getMonth()+1).toString().length == 1){
                  mes = '0'+(+timestampdate.getMonth()+1)
                }

                let d;
                if ((+timestampdate.getDate()).toString().length >= 2){
                  d = (+timestampdate.getDate())
                } else if ((+timestampdate.getDate()).toString().length == 1){
                  d = '0'+(+timestampdate.getDate())
                }

                if (timestampdate.getDay() == this.actividades[i].dayselect || this.actividades[i].dayselect == 0) {
                  this.clasesMesSiguiente.push({
                    fecha: d + '/' + mes,
                    tiempo: timestampdate.getTime()/1000 | 0,
                    hora_inicio: this.actividades[i].start_time,
                    actividad: this.actividades[i].activity_name,
                    centro: this.actividades[i].center_name,
                    profesor: this.actividades[i].teacher_name,
                    id_grupo: this.actividades[i].group_id,
                    id_centro: this.actividades[i].center_id,
                    id_actividad: this.actividades[i].activity_id,
                    cambiada: false
                  })  
                }

              }

            }

          }
          
        }

      }

      this.clasesMesSiguiente = this.clasesMesSiguiente.sort((a,b) => a.tiempo-b.tiempo);
      this.clasesMes = this.clasesMes.sort((a,b) => a.tiempo-b.tiempo);
      // console.log(this.clasesMes);
      // console.log(this.clasesMesSiguiente);
      
      this.clasesTotales = this.clasesTotales.concat(this.clasesMes.concat(this.clasesMesSiguiente));
      // console.log(this.clasesTotales);

    } // Fin de bucle de actividades
      

    if (this.asistencias) {
      for (let k = 0; k < this.asistencias.length; k++) {

        let tiempo = new Date(+this.asistencias[k].timee * 1000);

        let mes;
        if ((+tiempo.getMonth()+1).toString().length >= 2){
          mes = (+tiempo.getMonth()+1)
        } else if ((+tiempo.getMonth()+1).toString().length == 1){
          mes = '0'+(+tiempo.getMonth()+1)
        }
  
        let d;
        if ((+tiempo.getDate()).toString().length >= 2){
          d = (+tiempo.getDate())
        } else if ((+tiempo.getDate()).toString().length == 1){
          d = '0'+(+tiempo.getDate())
        }

        this.clasesTotales.push({
          fecha: d + '/' + mes,
          tiempo: +this.asistencias[k].timee,
          hora_inicio: this.asistencias[k].start_time,
          actividad: this.asistencias[k].activity_name,
          centro: this.asistencias[k].center_name,
          profesor: this.asistencias[k].teacher_name,
          id_grupo: this.asistencias[k].group_id,
          id_centro: this.asistencias[k].center_id,
          id_actividad: null,
          cambiada: true
        })
      }  
    }

    this.clasesTotales = this.clasesTotales.sort((a,b) => a.tiempo-b.tiempo);

    // let clasesTotalesAntes = this.clasesTotales;
    // let clasesTotalesAntes = this.clasesTotales.splice(0, this.clasesTotales.length, this.clasesTotales);
    // let clasesTotalesAntes = Object.assign([], this.clasesTotales);
    // let clasesTotalesAntes = JSON.parse(JSON.stringify(this.clasesTotales));


    // No tengo ni pajolera idea de por qué, pero si se llama clasesTotalesAntes cambia todo a la vez que clasesTotales y no van por separado haga lo que haga
    // Si se llama de cualquier otra forma funciona
    let antesClasesTotales = JSON.parse(JSON.stringify(this.clasesTotales));
    // console.log(this.clasesTotales);
    // console.log(antesClasesTotales);


    this.sinAsistir = [];
    let contadorSinAsistir = 0;


    for (let k = 0; k < antesClasesTotales.length; k++) {
      this._service.getCustomerUnassistances(antesClasesTotales[k].id_grupo, this.customer_id, antesClasesTotales[k].tiempo).subscribe( (res:any) => {
        this._service.getIsHoliday(antesClasesTotales[k].tiempo, antesClasesTotales[k].id_centro).subscribe( (resp:any) => {
          if (res.Unassistance === 'YES'){
            // this.clasesTotales.splice(k, 1);
            this.sinAsistir[contadorSinAsistir] = antesClasesTotales[k];
            this.sinAsistir = this.sinAsistir.sort((a,b) => a.tiempo-b.tiempo);
            this.clasesTotales[k].tiempo = 0
            // this.sinAsistir[contadorSinAsistir] = k;
            contadorSinAsistir++;
          } else {
            if (resp.holiday === 'YES'){
              this.sinAsistir[contadorSinAsistir] = antesClasesTotales[k];
              this.sinAsistir = this.sinAsistir.sort((a,b) => a.tiempo-b.tiempo);
              this.clasesTotales[k].tiempo = 0
              // this.sinAsistir[contadorSinAsistir] = k;
              contadorSinAsistir++;
            }
          }
        })
      })
    }

    // setTimeout(() => console.log(this.sinAsistir), 600);
    // setTimeout(() => console.log(this.clasesTotales), 600);

  } //Fin de la función getProximasClases



  getTicketsCliente() {

    this._service.getPurchasedTickets(this.customer_id).subscribe(res => {
      this.tickets = res;
      // console.log(this.tickets)
      if (this.tickets) {
        this.getDiaInglesTickets();

        this.fechaClaseTicket = [];
        for (let i = 0; i < this.tickets.length; i++) {
          let fecha = new Date(+(this.tickets[i].class_date)*1000);
          fecha.setHours(3);
          this.fechaClaseTicket[i] = fecha.toISOString().slice(0,10);
          // this.fechaClaseTicket[i] = new Date(+(this.tickets[i].class_date)*1000).toISOString().slice(0,10);
        }
      }

      
    })
  }

  getDiaInglesTickets() {
    this.dia1InglesTicket = [];
    this.dia2InglesTicket = [];

    for (let i = 0; i < this.tickets.length; i++) {

      switch(this.tickets[i].group_name.slice(0,3).toUpperCase()) {
        case 'LUN': {
          this.dia1InglesTicket[i] = 'MON';
          break
        }
        case 'MAR': {
          this.dia1InglesTicket[i] = 'TUE';
          break
        }
        case 'MIE': {
          this.dia1InglesTicket[i] = 'WED';
          break
        }
        case 'JUE': {
          this.dia1InglesTicket[i] = 'THU';
          break
        }
        case 'VIE': {
          this.dia1InglesTicket[i] = 'FRI';
          break
        }
        case 'SAB': {
          this.dia1InglesTicket[i] = 'SAT';
          break
        }
        case 'DOM': {
          this.dia1InglesTicket[i] = 'SUN';
          break
        }
      }

      switch(this.tickets[i].group_name.slice(9,12).toUpperCase()) {
        case 'LUN': {
          this.dia2InglesTicket[i] = 'MON';
          break
        }
        case 'MAR': {
          this.dia2InglesTicket[i] = 'TUE';
          break
        }
        case 'MIE': {
          this.dia2InglesTicket[i] = 'WED';
          break
        }
        case 'JUE': {
          this.dia2InglesTicket[i] = 'THU';
          break
        }
        case 'VIE': {
          this.dia2InglesTicket[i] = 'FRI';
          break
        }
        case 'SAB': {
          this.dia2InglesTicket[i] = 'SAT';
          break
        }
        case 'DOM': {
          this.dia2InglesTicket[i] = 'SUN';
          break
        }
      }

      // console.log(this.dia1InglesTicket);
      // console.log(this.dia2InglesTicket);
      
    }
  }

  getHuecos(activity_id, group_id, start_time, center_id) {

    // console.log(activity_id);
    // console.log(center_id);
    // console.log(group_id);
    // console.log(start_time);

    this._service.presentLoading();

    let fecha = (this.fechaElegida)/1000 | 0;
    // console.log(fecha);
    // console.log(activity_id);
    // console.log(center_id);

    this._service.getFreeHours(fecha, activity_id, center_id).subscribe( res => {
      this.huecos = res;
      // console.log(this.huecos);
      this.fechaAntigua = fecha;
      this.grupoAntiguo = group_id;
      this.inicioAntiguo = start_time;
      this.abrirModalCambio();
      this._service.dismissLoading();
    }, error =>{
      console.log(error);
    })
  }

  getHuecosOnDate(activity_id, group_id, start_time, center_id, recoverable_number, activity_name) {

    // console.log(activity_id);
    // console.log(center_id);
    // console.log(group_id);
    // console.log(start_time);
    // console.log(this.actividades);

    this._service.presentLoading();

    let fecha = (this.fechaElegida)/1000 | 0;
    // console.log(fecha);
    // console.log(activity_id);
    // console.log(center_id);

    this._service.getFreeHoursOnDate(fecha, activity_id, center_id).subscribe( res => {
      this.huecos = res;
      this.fechaAntigua = fecha;
      this.grupoAntiguo = group_id;
      this.inicioAntiguo = start_time;
      this.abrirModalRecuperar(recoverable_number, activity_name);
      this._service.dismissLoading();

    }, error =>{
      console.log(error);
    })
  }

  async abrirModalCambio() {

    // console.log(this.huecos);

    const modal = await this.modalController.create({
      component: CambiarClasePage,
      componentProps: { 
        huecos: this.huecos,
        fecha_antigua: this.fechaAntigua,
        grupo_antiguo: this.grupoAntiguo,
        inicio_antiguo: this.inicioAntiguo
      }
    });
    modal.onDidDismiss().then((data) => {
      this.getCliente();
      this.getActividadesCliente();
      this.getTicketsCliente();
    });
    return await modal.present();

  }

  async abrirModalRecuperar(recoverable_number, activity_name) {

    // console.log(this.huecos);

    const modal = await this.modalController.create({
      component: RecuperarClasePage,
      componentProps: { 
        huecos: this.huecos,
        fecha_antigua: this.fechaAntigua,
        grupo_antiguo: this.grupoAntiguo,
        inicio_antiguo: this.inicioAntiguo,
        recoverable_number: recoverable_number,
        activity_name: activity_name,
      }
    });
    modal.onDidDismiss().then((data) => {
      this.getCliente();
      this.getActividadesCliente();
      this.getTicketsCliente();
    });
    return await modal.present();

  }


  async abrirModalCancelar(group_id, start_time) {

    let fecha = (this.fechaElegida)/1000 | 0;

    this.fechaAntigua = fecha;
    this.grupoAntiguo = group_id;
    this.inicioAntiguo = start_time;

    const modal = await this.modalController.create({
      component: AnularClasePage,
      componentProps: { 
        fecha_antigua: this.fechaAntigua,
        grupo_antiguo: this.grupoAntiguo,
        inicio_antiguo: this.inicioAntiguo
      }
    });
    modal.onDidDismiss().then((data) => {
      this.getCliente();
      this.getActividadesCliente();
      this.getTicketsCliente();
    });

    return await modal.present();

  }



  // Para Pruebas
  getFecha () {

    // console.log(this.fechaElegida);
    // console.log(this.fechaElegida.getTime());

    // console.log(this.clasesTotales[9].tiempo*1000);
    // console.log((+this.clasesTotales[9].tiempo*1000) == +this.fechaElegida.getTime())
    // console.log(this.actividadDia);

    // console.log(this.diaACambiar);
    // console.log(this.fechaIgual);
    // console.log(this.fechaIgualTickets);

    // let prueba = new Date(+(this.tickets[0].class_date)*1000);
    // console.log(prueba);

    // console.log(this.fechaElegida.toString() == prueba.toString());
    

    // console.log(this.tickets[0].group_name.slice(0,3));
    // console.log(this.tickets[0].group_name.slice(9,12));

  }

}
