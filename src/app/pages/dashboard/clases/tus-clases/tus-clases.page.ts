import { Component, OnInit } from '@angular/core';

import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';

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
        shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      }
    },
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  };


  constructor() { }

  ngOnInit() {
  }

}
