import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;

    this.http.post('/api/forget-password', { email }).subscribe(() => {
      // Show a success message
    });
  }

}
