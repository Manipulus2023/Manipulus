import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root',
})
export class UnitServise {
  onAddUnit(value: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.baseurl;
  constructor(private httpClient: HttpClient) {}
  public getUnitList(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(`${this.baseUrl}/unit/all`);
  }
  public addUnit(item: Unit): Observable<Unit> {
    return this.httpClient.post<Unit>(`${this.baseUrl}/unit/add`, Unit);
  }
  public updateUnit(item: Unit): Observable<Unit> {
    return this.httpClient.put<Unit>(`${this.baseUrl}/unit/update`, Unit);
  }

  public deleteUnit(unitId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/unit/delete/${unitId}`
    );
  }
}
