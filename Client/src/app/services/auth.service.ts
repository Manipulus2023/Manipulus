import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser } from '../models/logged-user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService = new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null> (null);

  constructor(private httpClient: HttpClient) { }

  login(user: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.httpClient.post<LoginResponse>(environment.baseurl + '/login', formData);
  }

  saveToken(jwtTokens: LoginResponse) {
    const decodedAccessToken = this.jwtHelperService.decodeToken(jwtTokens.accessToken);
    const loggedUser = new LoggedUser(decodedAccessToken.sub, decodedAccessToken.roles, jwtTokens.accessToken, this.getExpirationDate(decodedAccessToken.exp))
    this.user.next(loggedUser);
  }

  getExpirationDate(exp: number) {
    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }
}
