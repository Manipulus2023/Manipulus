import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  searchForm: FormGroup;
  userSubscription: Subscription;
  users: User[] = [];
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  selectedUser: any;
  key: string;

  public editUser!: User;
  public deleteUser!: User;

  //Data Table configs
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.searchForm = this.formBuilder.group({
      key: ['']
    });
  }

  ngOnInit() {
    this.getUserList();
    this.initializeUserForm();
    this.loadDataTableConfigs();
  }

  loadDataTableConfigs() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
    };
    this.dtoptions = {
      retrieve: true,
    };
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  getUserList() {
    this.userSubscription = this.userService.getUserList().subscribe(res => {
      this.users = res;
    });
  }

  initializeUserForm() {
    this.addUserForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', Validators.required),
      lastName: this.formBuilder.control('', Validators.required),
      userName: this.formBuilder.control('', Validators.required),
      address: this.formBuilder.control('', Validators.required),
      mobileNumber: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      designation: this.formBuilder.control(''),
      group: this.formBuilder.control(''),
      userRole: this.formBuilder.control(''),

    });
  }

  onUserAdd() {
    console.log(this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value).subscribe(res => {
      console.log(res);
    });
  }

  onAddUserSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    const newUser = this.addUserForm.value;
    this.users.push(newUser);
    this.closeAddUserModal();
  }

  onEditUserSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    const updatedUser = this.addUserForm.value;
    // Update the selected user in the list
    const index = this.users.findIndex(user => user === this.selectedUser);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
    this.closeEditUserModal();
  }

  openAddUserModal() {
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal() {
    this.isAddUserModalOpen = false;
    this.addUserForm.reset();
  }
  openEditUserModal(user: any) {
    this.isEditUserModalOpen = true;
    this.selectedUser = user;
    this.addUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      address: user.address,
      mobileNumber: user.mobileNumber,
      email: user.email,
      password: user.password,
      status: user.status,
      designation: user.designation,
      group: user.group,
      userRole: user.userRole,
    });
  }

  closeEditUserModal() {
    this.isEditUserModalOpen = false;
    this.addUserForm.reset();
    this.selectedUser = null;
  }

  searchUser(value: string) {
    const searchKey = this.searchForm.value.key;
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById(
      'main-container'
    ) as HTMLInputElement;

    // Create a hidden button element
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    // If mode is 'edit', set data-bs-target attribute to edit modal and assign user to edituser property
    // if (mode === 'edit') {
    //   button.setAttribute('data-bs-target', '#exampleModal2');
    //   this.edituser = user;
    // }

    // If mode is 'delete', set data-bs-target attribute to delete modal and assign user to deleteuser property
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#exampleModal3');
      this.deleteUser = user;
    }

    // Append button to main container element and trigger a click event
    container.appendChild(button);
    button.click();
  }
}
