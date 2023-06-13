import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Locations } from './location';

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
  public addlocation(location: Locations): Observable<Locations> {
    return this.httpClient.post<Locations>(`${this.baseUrl}/location/add`,location);
  }

}