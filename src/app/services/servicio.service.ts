import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public url: string;
  public isLoading = false;

  public headers = new HttpHeaders()
    .set('http_apikey', 'kvuUazUVNWEqrCK5XYYzma6VLQTv4AJg')
    .set('http_managerurl', 'soluna');


  constructor(public http: HttpClient,
    private loadingController: LoadingController) {
    this.url=GLOBAL.url;
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "crescent",
      duration: 10000,
       translucent: true,
       cssClass: 'loadingDialog'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  getUsers(login, password): Observable<any>{
    // return this.http.get(this.url+`/ca_login/${login}/${password}`);
    return this.http.get(this.url+`/ca_login/${login}/${password}`, {headers: this.headers});
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

    // const expira = Number(localStorage.getItem('expira'));
    // const hoy = new Date();
    // hoy.setTime(expira);

    // if ( expira > Number(new Date()) ) {
      return true;
    // } else {
    //   localStorage.removeItem('currentUserSoluna');
    //   return false;
    // }
  }

  registerUser(customer_id){
    return this.http.get(this.url+`/ca_create_user/${customer_id}`, {headers: this.headers});
  }

  recoverPassword(login) {
    return this.http.get(this.url+`/ca_recover_password/${login}`, {headers: this.headers});
  }

  getCustomerById(customer_id) {
    return this.http.get(this.url+`/get_customer/${customer_id}`, {headers: this.headers});
  }

  getCheckCustomer(document) {
    return this.http.get(this.url + `/ca_check_customer/${document}`, {headers: this.headers});
  }

  updateCustomerData(data) {
    return this.http.post(this.url+'/ca_update_customer_data/', data, {headers: this.headers});
  }

  changeUserPassword(data) {
    return this.http.post(this.url+'/ca_change_user_pwd', data, {headers: this.headers});
  }

  getAsssistanceById(customer_id) {
    return this.http.get(this.url+`/get_customer_assistance_percent/${customer_id}`, {headers: this.headers});
  }

  getLastPayments(customer_id) {
    return this.http.get(this.url+`/ca_last_payments/${customer_id}`, {headers: this.headers});
  }

  getBillUser(customer_id, center_id) {
    return this.http.get(this.url+`/ca_bill_user/${customer_id}/${center_id}`, {headers: this.headers});
  }

  getMonthAssistance(customer_id) {
    return this.http.get(this.url+`/get_customer_assistance_month/${customer_id}`, {headers: this.headers});
  }

  getCustomerActivity(customer_id) {
    return this.http.get(this.url+`/ca_get_customer_activities/${customer_id}`, {headers: this.headers});
  }

  getCustomerAssistances(customer_id) {
    return this.http.get(this.url+`/ca_get_customer_assistances/${customer_id}`, {headers: this.headers});
  }

  getCustomerUnassistances(group_id, customer_id, day_time) {
    return this.http.get(this.url+`/ca_check_customer_unassistance/${group_id}/${customer_id}/${day_time}`, {headers: this.headers});
  }

  getIsHoliday(date, center_id) {
    return this.http.get(this.url+`/ca_is_holiday/${date}/${center_id}`, {headers: this.headers});
  }

  getFreeHours(date, activity_id, center_id){
    return this.http.get(this.url+`/ca_get_free_hours/${date}/${activity_id}/${center_id}`, {headers: this.headers});
  }

  getFreeHoursOnDate(date, activity_id, center_id){
    return this.http.get(this.url+`/ca_get_free_hours_on_date/${date}/${activity_id}/${center_id}`, {headers: this.headers});
  }

  recordUnassistNew(date_time, customer_id){
    return this.http.get(this.url+`/ca_record_unassist_new/${date_time}/${customer_id}`, {headers: this.headers});
  }

  recordRecoverableClass(date_time, customer_id){
    return this.http.get(this.url+`/ca_record_recoverable_class/${date_time}/${customer_id}`, {headers: this.headers});
  }

  redeemRecoverableClass(date_time, customer_id){
    return this.http.get(this.url+`/ca_redeem_recoverable_class/${date_time}/${customer_id}`, {headers: this.headers});
  }

  recordAssistNew(date_time, customer_id){
    return this.http.get(this.url+`/ca_record_assist_new/${date_time}/${customer_id}`, {headers: this.headers});
  }

  getRecoverableClassesNumber(customer_id){
    return this.http.get(this.url+`/ca_get_recoverable_classes_number/${customer_id}`, {headers: this.headers});
  }

  getRecoverableClasses(customer_id){
    return this.http.get(this.url+`/ca_get_recoverable_classes/${customer_id}`, {headers: this.headers});
  }

  saveNotification(data){
    return this.http.post(this.url+'/save_ca_notification/', data, {headers: this.headers});
  }

  getPurchasedTickets(customer_id) {
    return this.http.get(this.url+`/tickets_get_customer_purchased/${customer_id}`, {headers: this.headers});
  }

  getTicketsAvailable(center_id) {
    return this.http.get(this.url+`/tickets_get_prices_multiactivity_multidate/${center_id}`, {headers: this.headers});
  }

  getTicketsAvailableOnDate(date, center_id) {
    return this.http.get(this.url+`/tickets_get_prices_multiactivity/${date}/${center_id}`, {headers: this.headers});
  }

  getTicketCreatePreReserve(date, activity_id, center_id, group_id, amount, ticket_type) {
    return this.http.get(this.url+`/tickets_create_pre_reserve/${date}/${activity_id}/${center_id}/${group_id}/${amount}/${ticket_type}`, {headers: this.headers});
  }

  getTicketDeletePreReserve(reserve_id) {
    return this.http.get(this.url+`/tickets_delete_pre_reserve/${reserve_id}`, {headers: this.headers});
  }

  getTicketPaymentCreate(customer_id, tpv_order, amount, ticket_id) {
    return this.http.get(this.url+`/tickets_create_payment/${customer_id}/${tpv_order}/${amount}/${ticket_id}`, {headers: this.headers});
  }

  getTicketPaymentUpdate( tpv_order, status, hash) {
    return this.http.get(this.url+`/tickets_update_tpv_order/${tpv_order}/${status}/${hash}`, {headers: this.headers});
    // return this.http.get(this.url+`/tickets_update_tpv_order/${tpv_order}/${status}/${hash}`);
  }

  getMonthlyPaymentCreate(customer_id,center_id, tpv_order) {
    return this.http.get(this.url+`/ca_create_payment/${customer_id}/${center_id}/${tpv_order}`, {headers: this.headers});
  }

  getMonthlyPaymentUpdate( tpv_order, status) {
    return this.http.get(this.url+`/ca_update_tpv_order/${tpv_order}/${status}`, {headers: this.headers});
    // return this.http.get(this.url+`/tickets_update_tpv_order/${tpv_order}/${status}/${hash}`);
  }

  getBondActivities(center_id): Observable<any>{
    return this.http.get(this.url+`/bonds_get_activities/${center_id}`, {headers: this.headers});
  }

  getCenters(): Observable<any>{
    return this.http.get(this.url+'/get_centers/', {headers: this.headers});
    // return this.http.get(this.url+'/get_centers/');
  }

  // pruebaPagoRedsys() {
  //   // return this.http.get(this.url+'/tpv_payment', {headers: this.headers});
  //   return this.http.get(this.url+'/tpv_payment');
  // }
}
