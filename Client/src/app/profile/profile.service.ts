import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../user/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl =environment.baseurl;

  constructor(private http: HttpClient) { }

  getUserInformation(username: string): Observable<any> {
    const url = `${this.baseUrl}/users/${username}`;

    return this.http.get(url);
  }

  

}
