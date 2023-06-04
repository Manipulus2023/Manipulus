import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../authentication/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  content: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //this.forUser();
    this.userService.getUserBoard().subscribe(
      res=> {
        this.content = res;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }


  //TODO: Remove these
  // forUser(){
  //   this.userService.forUser().subscribe(
  //   (response)=>{
  //     this.router.navigate(['dashboard']);
  //   },
  //   (error)=>{
  //     console.log(error);
  //   }
  //   );

  // }

}
