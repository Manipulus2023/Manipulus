import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteVisit } from './siteVisit';
import { environment } from 'src/environments/environment';
import { Vehicle } from "../vehicle/vehicle";

@Injectable({
  providedIn: 'root'
})
export class SiteVisitService {
  
 
 
 
  getCompletedSiteVisits() {
    throw new Error('Method not implemented.');
  }
  private apiServerUrl = environment.baseurl;
 
  constructor(private http: HttpClient) { }
  getAvailableVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/all`);
  }
  public getSiteVisits():Observable<SiteVisit[]> {
    return this.http.get<SiteVisit[]>(`${this.apiServerUrl}/siteVisit/all`);

}
public addSiteVisit(siteVisit: SiteVisit):Observable<SiteVisit> {
    return this.http.post<SiteVisit>(`${this.apiServerUrl}/siteVisit/add`,siteVisit);

}
public updateSiteVisit(siteVisit: SiteVisit):Observable<SiteVisit> {
    return this.http.put<SiteVisit>(`${this.apiServerUrl}/siteVisit/update`,siteVisit);

}
public deleteSiteVisit(siteVisitId: number):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/siteVisit/delete/${siteVisitId}`);

}
}
