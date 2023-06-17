import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   user=null;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.();
  }

}
