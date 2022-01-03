import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url=GLOBAL.url;
  }

  // getMantenimiento(): Observable<any>{
  //   return this.http.get(this.url+'/mantenimiento');
  // }

  // getUsuarios(): Observable<any>{
  //   return this.http.get(this.url+'/usuario');
  // }

  getUsers(login, password): Observable<any>{
    return this.http.get(this.url+`/ca_login/${login}/${password}`);
  }

  logOut() {
    localStorage.removeItem('item');
  }

  logueado() {

    let currentUserSoluna

    if (localStorage.getItem('currentUserSoluna')) {
      currentUserSoluna = localStorage.getItem('currentUserSoluna');
    } else {
      currentUserSoluna = '';
    }

    if ( !currentUserSoluna ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const hoy = new Date();
    hoy.setTime(expira);

    if ( expira > Number(new Date()) ) {
      return true;
    } else {
      localStorage.removeItem('currentUserSoluna');
      return false;
    }
  }

  getCustomerById(customer_id) {
    return this.http.get(this.url+`/get_customer/${customer_id}`);
  }

  getAsssistanceById(customer_id) {
    return this.http.get(this.url+`/get_customer_assistance_percent/${customer_id}`);
  }

  getLastPayments(customer_id) {
    return this.http.get(this.url+`/ca_last_payments/${customer_id}`);
  }

  getBillUser(customer_id, center_id) {
    return this.http.get(this.url+`/ca_bill_user/${customer_id}/${center_id}`);
  }

  getMonthAssistance(customer_id) {
    return this.http.get(this.url+`/get_customer_assistance_month/${customer_id}`);

  }

  getCenters(): Observable<any>{
    return this.http.get(this.url+'/get_centers/');
  }
}
