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

  getMantenimiento(): Observable<any>{
    return this.http.get(this.url+'/mantenimiento');
  }

  getUsuarios(): Observable<any>{
    return this.http.get(this.url+'/usuario');
  }
}
