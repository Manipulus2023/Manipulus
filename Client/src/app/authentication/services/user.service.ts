import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

const API_PATH = 'http://localhost:8080/api/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAutService: UserAuthService
  ) {}

  getPublicContent(): Observable<any> {
    return this.httpclient.get(API_PATH + 'all', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.httpclient.get(API_PATH + 'admin', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.httpclient.get(API_PATH + 'user', { responseType: 'text' });
  }

  // public login(loginData: NgForm) {
  //   return this.httpclient.post(this.API_PATH + '/authenticate', loginData, {
  //     headers: this.requestHeader,
  //   });
  // }

  // public forUser() {
  //   return this.httpclient.get(this.API_PATH + '/forUser', {
  //     responseType: 'text',
  //   });
  // }

  // public forAdmin() {
  //   return this.httpclient.get(this.API_PATH + '/forAdmin', {
  //     responseType: 'text',
  //   });
  // }

  // public roleMatch(allowedRoles: any): boolean {
  //   let isMatch = false;
  //   const userRoles: any = this.userAutService.getRoles();

  //   if (userRoles != null && userRoles) {
  //     for (let i = 0; i < userRoles.length; i++) {
  //       for (let j = 0; j < allowedRoles.length; j++) {
  //         if (userRoles[i].roleName === allowedRoles[j]) {
  //           isMatch = true;
  //           return isMatch;
  //         } else {
  //           return isMatch;
  //         }
  //       }
  //     }
  //   }
  //   return isMatch;
  // }
}
