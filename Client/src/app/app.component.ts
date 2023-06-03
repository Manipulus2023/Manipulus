import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Manipulus';
  isTokenAvailable: string;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedin();
  }


  public isLoggedin() {
    this.isTokenAvailable = this.userAuthService.isLoggedIn();
  }
}



