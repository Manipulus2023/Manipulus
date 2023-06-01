import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message:any;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe(
    (response)=>{
      this.router.navigate(['dashboard']);
    },
    (error)=>{
      console.log(error);
    }
    );

  }

}
