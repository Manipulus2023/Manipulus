import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl=environment.baseurl;

  constructor(private httpClient : HttpClient) { }

  public getUnitList(): Observable<Unit[]>{
    return this.httpClient.get<Unit[]>(`${this.baseUrl}/unit`);
  }

   public addUnit(unit:Unit): Observable<Unit>{
    return this.httpClient.post<Unit>(`${this.baseUrl}/unit` ,unit);
  }

  public updateUnit(unit:Unit): Observable<Unit>{
    return this.httpClient.put<Unit>(`${this.baseUrl}/unit/update` ,unit);
  }
  public deleteUnit(unitId:Number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/unit/delete/${unitId}` );
  }




}
