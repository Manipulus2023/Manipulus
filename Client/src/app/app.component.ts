import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './authentication/services/user-auth.service';
import { TokenStorageService } from './authentication/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
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

  //TODO: Remove this
  public isLoggedin() {
    this.isTokenAvailable = this.userAuthService.isLoggedIn();
  }
}



