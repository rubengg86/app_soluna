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

    let currentUser

    if (localStorage.getItem('currentUser')) {
      currentUser = localStorage.getItem('currentUser');
    } else {
      currentUser = '';
    }

    if ( !currentUser ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const hoy = new Date();
    hoy.setTime(expira);

    if ( expira > Number(new Date()) ) {
      return true;
    } else {
      localStorage.removeItem('currentUser');
      return false;
    }
  }

  getCenters(): Observable<any>{
    return this.http.get(this.url+'/get_centers/');
  }
}
