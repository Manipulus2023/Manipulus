import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Locations, NewLocation } from './locations';
import { Customer } from '../customer/customer';

@Injectable({
  providedIn: 'root',
})
export class locationService {

  private baseUrl = environment.baseurl;

  constructor(private httpClient: HttpClient) { }


//   public getJobList(): Observable<Job[]> {
//     return this.httpClient.get<Job[]>(`${this.baseUrl}/job/all`);
//   }


//   public addJob(job: Job, id: number): Observable<Job> {
//     return this.httpClient.post<Job>(`${this.baseUrl}/job/add?id=${id}`, job);
//   }
  

  public getlocationlist(): Observable<Locations[]> {
    return this.httpClient.get<Locations[]>(`${this.baseUrl}/location/all`);
  }

  public addlocation(newLocation: NewLocation, id: number): Observable<NewLocation> {
    return this.httpClient.post<NewLocation>(`${this.baseUrl}/location/add/${id}`, newLocation);

  }
  public findCustomerById(customerId: Number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseUrl}/customer/find/${customerId}`);
  }

  public getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/customer/all`); // Get a list of all customers from the server
  }
}