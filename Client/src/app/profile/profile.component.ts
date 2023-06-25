import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { LoggedUser } from '../models/logged-user-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../models/user-profile.model';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSubscription: Subscription;
  currentUser: LoggedUser;
  profileForm: FormGroup;
  updatedProfile: UserProfile;
  currentProfile: UserProfile;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.subscribeToUser();
    if(this.currentUser){
      this.initializeProfileForm();
    }
  }

  subscribeToUser() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if(user != null) {
        this.currentUser = user;

      }
    });
  }

  initializeProfileForm() {
    this.profileForm = this.formBuilder.group({
      first_name: this.formBuilder.control('', Validators.required),
      last_name: this.formBuilder.control('', Validators.required),
      user_name: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required)
    });
    console.log(this.currentUser.username);

    this.getUserInformation(this.currentUser.username);
  }

  getUserInformation(username: string)  {
     this.userService.getUserInformation(username).subscribe(res => {
      if(res) {
        this.currentProfile = res;
        this.setValuesToTheForm(this.currentProfile);
      }
    });
  }

  setValuesToTheForm(userProfile: UserProfile){
    this.profileForm.setValue({
      user_name: userProfile.user_name,
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      email: userProfile.email,
      password: ''
    });
  }

  onUpdate(){
    this.userService.updateUserProfile(this.profileForm.value, this.currentUser.username).subscribe(res => {
      if(res) {
        this.updatedProfile = res;
      }
      window.location.reload();
    });
    this.setValuesToTheForm(this.updatedProfile);
  }

}

//Create a form named profileForm in the HTML
//Write backend methods to get userdata when pass username
// Test with postman


//Get data from the form
//Send as request to the backend
//Create backend controller in user controller (PUT)
//Save data

