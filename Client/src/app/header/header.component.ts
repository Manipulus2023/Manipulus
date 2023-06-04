import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../authentication/services/user-auth.service';
import { UserService } from '../authentication/services/user.service';
import { TokenStorageService } from '../authentication/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Manipulus';
  isTokenAvailable: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;

  constructor(private userAuthService: UserAuthService, private router: Router, private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
    //this.isLoggedin();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showUserBoard = this.roles.includes('USER');

      this.username = user.username;
    }
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  //TODO: Remove these
  // constructor(
  //   private userAuthService: UserAuthService,
  //   private router: Router,
  //   public userService: UserService
  // ) {}

  // ngOnInit(): void {}

  // public isLoggedin() {
  //   return this.userAuthService.isLoggedIn();
  // }

  // public logout() {
  //   this.userAuthService.clear();
  //   this.router.navigate(['/user-login']);
  // }
}
