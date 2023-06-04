import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { request } from 'http';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    const token = this.token.getToken();

    if(token != null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    }
    return next.handle(authRequest);
  }

}

export const authInterceptorProviders = [
  { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];


  // constructor(
  //   private userAuthService: UserAuthService,
  //   private router: Router
  // ) {}

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   if (req.headers.get('No-Auth') === 'True') {
  //     return next.handle(req.clone());
  //   }
  //   const token = this.userAuthService.getToken();

  //   req = this.addToken(req, token);

  //   return next.handle(req).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       console.log(err.status);
  //       if (err.status === 401) {
  //         this.router.navigate(['/login]']);
  //       } else if (err.status === 403) {
  //         this.router.navigate(['/forbidden']);
  //       }
  //       return throwError('Something is wrong');
  //     })
  //   );
  // }

  // private addToken(request: HttpRequest<any>, token: string) {
  //   return request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

