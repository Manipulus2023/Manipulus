import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, NewJob,  } from './job';
import { Customer } from '../customer/customer';
import { Locations } from '../location/locations';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // Initialize the base URL from the environment variable
  private baseUrl = environment.baseurl;

  constructor(private httpClient: HttpClient) { }

  // Retrieves a list of all jobs
  public getJobList(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.baseUrl}/job/all`);
  }

  // Adds a new job
  public addJob(job: NewJob, id: number): Observable<NewJob> {
    return this.httpClient.post<NewJob>(`${this.baseUrl}/job/add/${id}`, job);
  }
  
  // Updates an existing job
  public updateJob(job: Job, id: number): Observable<Job> {
    return this.httpClient.put<Job>(`${this.baseUrl}/job/update?id=${id}`, job);
  }

  // Deletes an existing job
  public deleteJob(jobId: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/job/delete/${jobId}`);
  }

  public findCustomerById(customerId: Number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseUrl}/customer/find/${customerId}`);
  }

  public getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/customer/all`); // Get a list of all customers from the server
  }

  public findLocationByCustomerId(customerId: Number): Observable<Locations[]>{
    return this.httpClient.get<Locations[]>(`${this.baseUrl}/location/customer/${customerId}/location-ids`);
  }

   public getlocationlist(): Observable<Locations[]> {
    return this.httpClient.get<Locations[]>(`${this.baseUrl}/location/all`);
  }

  
  // public addlocation( job: Job, id: number): Observable<Locations> {
  //   const locationToAdd: Locations = {
  //     location_title: '',
  //     //@ts-ignore
  //     location_info: '',
  //     location_lat: 0,
  //     location_lng: 0
  //   };
  
  //   locationToAdd.location_title = job.job_type; 
  //   //@ts-ignore
  //   locationToAdd.location_info = null; 
  //   const regex = /@(-?\d+\.?\d*),(-?\d+\.?\d*),/;
  //   const matches = job.location.match(regex);
    
  //   if (matches && matches.length >= 3) {
  //     locationToAdd.location_lat = parseFloat(matches[1]);
  //     locationToAdd.location_lng = parseFloat(matches[2]);
  //   } else {
  //     // Handle the case where the URL format is invalid
  //     locationToAdd.location_lat = 0;
  //     locationToAdd.location_lng = 0;
  //   }
    
  //   return this.httpClient.post<Locations>(`${this.baseUrl}/location/add?id=${id}`, locationToAdd);
  // }
  

}