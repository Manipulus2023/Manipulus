import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl=environment.baseurl;

  constructor( private httpClient : HttpClient) { }


  public getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/customer/all`);
  }

   public addCustomer(customer:Customer): Observable<Customer>{
    return this.httpClient.post<Customer>(`${this.baseUrl}/customer/add` ,customer);
  }

  public updateCustomer(customer:Customer): Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.baseUrl}/customer/update` ,customer);
  }
  public deleteCustomer(customerId:Number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/customer/delete/${customerId}` );
  }


}

