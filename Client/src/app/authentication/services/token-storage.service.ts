import { Injectable } from '@angular/core';
import { User } from '../../user-login/User/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})

export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let x = sessionStorage.getItem(TOKEN_KEY);
    if(x == null){
      return '';
    }
    return x;
  }

  public saveUser(use: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(use));
  }

  public getUser(): any {
    let x = sessionStorage.getItem(TOKEN_KEY);
    if(x == null){
      return JSON.parse('');
    }
    return JSON.parse(x);
  }
}