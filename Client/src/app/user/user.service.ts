import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User, UserResponse } from "./user";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = environment.baseurl;

  constructor(private httpClient: HttpClient) { }

  public getUserList(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${this.baseUrl}/users`);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, user);
  }

  public editUser(userId: Number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }
  public deleteUser(userId: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/users/${userId}`);
  }

  getUserInformation(username: string ) {
    return this.httpClient.get<UserProfile>(`${this.baseUrl}/users/profile/${username}`);
  }

  updateUserProfile(userProfile: UserProfile, username: string ) {
    return this.httpClient.put<UserProfile>(`${this.baseUrl}/users/update-profile/${username}`,userProfile);
  }
}



