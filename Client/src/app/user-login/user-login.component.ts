import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../authentication/services/user-auth.service';
import { UserService } from '../authentication/services/user.service';
import { AuthService } from '../authentication/services/auth.service';
import { TokenStorageService } from '../authentication/services/token-storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  //TODO: Migrate to reactive forms
  onSumbit(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(res =>
    {
      this.tokenStorageService.saveToken(res.accessToken);
      this.tokenStorageService.saveUser(res);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.reloadPage();
    },
    err => {
      console.log(err);

      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  //TODO: Remove
  // goToForgetPassword() {
  //   this.router.navigate(['/forget-password']);
  // };

  // login(loginForm: NgForm) {

  //   this.userService.login(loginForm.value).subscribe(
  //     (response: any) => {
  //       this.userAuthService.setRoles(response.user.role);
  //       this.userAuthService.setToken(response.jwtToken);



  //       const role = response.user.role[0].roleName;
  //       if (role === 'Admin') {
  //         this.router.navigate(['/admin']);
  //       } else {
  //         this.router.navigate(['/user']);
  //       }
  //     },


  //     (error: any) => {
  //       console.log(error);
  //     }
  //   )
  // }

}



