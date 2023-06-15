import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteVisit } from './siteVisit';
import { environment } from 'src/environments/environment';
import { Vehicle } from "../vehicle/vehicle";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SiteVisitService {
  siteVisitService: any;
 

  private apiServerUrl = environment.baseurl;
  //printSiteVisit: any;
  constructor(private http: HttpClient) { }
  getCompletedSiteVisits() {
    throw new Error('Method not implemented.');
  }
  
  getAvailableVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/all`);
  }
  public updateVehicles(vehicle: Vehicle):Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiServerUrl}/vehicle/update`,vehicle);

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


// public printGatePass(siteVisitId: number):Observable<void> {
  
//   return this.http.get<void>(`${this.apiServerUrl}/gate-pass/printGatePass/${siteVisitId}`);

// }

downloadPDF(): Observable<Blob> {
  const url = 'http://localhost:8080/gate-pass/printGatePass/1';
  return this.http.get(url, { responseType: 'blob' });
}

// generateGatePass(siteVisitId:number): Observable<void> {
//   const headers = new HttpHeaders().set('Accept', 'application/pdf');
//   return this.http.get<any>(`${this.apiServerUrl}/gate-pass/printGatePass/${siteVisitId}`, {
//     headers: headers,
//     responseType: 'json',
//     observe: 'response'
//   });
// }
// printGatePass(siteVisitId: number): Observable<void> {
//   const headers = { 'Content-Type': 'application/pdf' };
//   return this.http.get<void>(`${this.apiServerUrl}/gate-pass/printGatePass/${siteVisitId}`, {
//     headers: headers,
//     responseType: 'blob' as 'json' // Set the response type to 'blob' to handle PDF data
//   });
// }
// printGatePass(siteVisitId: number): Observable<void> {
//   const headers = { 'Content-Type': 'application/pdf' };
//   return this.http.get<void>(`${this.apiServerUrl}/gate-pass/printGatePass/${siteVisitId}`, {
//     headers: headers,
//     responseType: 'blob' as 'json'
//   });
// }
}

