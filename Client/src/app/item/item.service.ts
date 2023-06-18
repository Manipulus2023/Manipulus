import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Item } from './item';


@Injectable({
    providedIn: 'root'  
})
export class ItemServise{
  onAddItem(value: any) {
    throw new Error('Method not implemented.');
  }
    private baseUrl=environment.baseurl;
    constructor( private httpClient : HttpClient){}

     public getItemList(): Observable<Item[]>{
        return this.httpClient.get<Item[]>(`${this.baseUrl}/item/all`)
     }
     public addItem(item: Item): Observable<Item>{
        return this.httpClient.post<Item>(`${this.baseUrl}/item/add`, item);
     }

     public updateItem(item: Item): Observable<Item>{
        return this.httpClient.put<Item>(`${this.baseUrl}/item/update`, item);
    }
    
     public deleteItem(itemId: number): Observable<void>{
        return this.httpClient.delete<void>(`${this.baseUrl}/item/delete/${itemId}`);
    }

}