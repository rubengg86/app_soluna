import { Component, OnInit } from '@angular/core';

import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import { ServicioService } from '../../../../services/servicio.service';

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
    enableTime: true,
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
longhand: ['Enero', 'Febreo', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      }
    },
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };

  public customer_id = localStorage.getItem('currentUserSoluna');
  public clasesMes;

  constructor(private _service: ServicioService) { }

  getAsistenciaMensual () {
    this._service.getMonthAssistance(this.customer_id).subscribe( res => {

      this.clasesMes = res;
      console.log(this.clasesMes);

    }, error =>{
      console.log(error);
    })
  }

  ngOnInit() {
    this.getAsistenciaMensual();
  }

}
