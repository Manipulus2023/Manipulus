import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../authentication/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
