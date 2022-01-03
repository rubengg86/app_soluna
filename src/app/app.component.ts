import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './services/servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'loginAdmin';
  public mantenimientos=0;

  constructor(private router: Router, private servicio: ServicioService) { }

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
