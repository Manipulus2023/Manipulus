import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = environment.baseurl;
  constructor( private httpClient : HttpClient) { }

  public getJobList(): Observable<Job[]>{
    return this.httpClient.get<Job[]>(`${this.baseUrl}/job/all`);
  }

   public addJob(job:Job): Observable<Job>{
    return this.httpClient.post<Job>(`${this.baseUrl}/job/add` ,job);
  }

  public updateJob(job:Job): Observable<Job>{
    return this.httpClient.put<Job>(`${this.baseUrl}/job/update` ,job);
  }
  public deleteJob(jobId:Number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/job/delete/${jobId}` );
  }
}
