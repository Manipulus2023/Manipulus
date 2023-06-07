import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { User } from '../user-login/User/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  addUserForm: FormGroup;
  userSubscription: Subscription;
  users: User[] = [];
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  selectedUser: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
        //this.getUserList();
        this.initializeUserForm();
  }

  getUserList(){
    this.userSubscription = this.userService.getUserList().subscribe(res =>
    {
      this.users = res;
    });
  }

  initializeUserForm() {
    this.addUserForm=this.formBuilder.group({
      NameOfTheUser: this.formBuilder.control(''),
      personalAddress: this.formBuilder.control(''),
      userMobileNumber: this.formBuilder.control(''),
      useremailAddress: this.formBuilder.control(''),
      userPassword: this.formBuilder.control(''),
      userstatus: this.formBuilder.control(''),
      userdesignation: this.formBuilder.control(''),
      userGroup: this.formBuilder.control(''),
      roleOfTheUser: this.formBuilder.control(''),

    })
  }

  onUserAdd() {
    console.log(this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value).subscribe((res) =>
      {
        console.log(res);
      });
  }

  onAddUserSubmit() {
    // if (this.addUserForm.invalid) {
    //   return;
    // }
    // const newUser = this.addUserForm.value;
    // this.users.push(newUser );
    // this.closeAddUserModal();
  }

  // onEditUserSubmit() {
  //   if (this.editUserForm.invalid) {
  //     return;
  //   }

  // const updatedUser = this.editUserForm.value;
  // // Update the selected user in the list
  // const index = this.users.findIndex(user => user === this.selectedUser);
  // if (index !== -1) {
  //   this.users[index] = updatedUser;
  // }

  //   this.closeEditUserModal();
  // }

  openAddUserModal() {
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal() {
    // this.isAddUserModalOpen = false;
    // this.addUserForm.reset();
  }

  // openEditUserModal(user: any) {
  //   this.isEditUserModalOpen = true;
  //   this.selectedUser = unit;
  //   // Pre-fill the edit form with the selected user's data
  //  // this.editUserForm.patchValue({
  //   unitName: unit.unitName,
  //   itemName: unit.itemName,
  //     // Update other user fields
  //   });
  // }

  // closeEditCustomerModal() {
  //   this.isEditUnitModalOpen = false;
  //   this.editUnitForm.reset();
  //   this.selectedUnit = null;
  // }

  searchUser() {
    //const searchKey = this.searchForm.value.key;
    // Perform the search operation using the searchKey
    // ...
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}


