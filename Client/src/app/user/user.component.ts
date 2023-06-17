import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  searchForm: FormGroup;
  userSubscription: Subscription;
  users: UserResponse[] = [];
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  selectedUser: any;
  public editUser!: UserResponse;
  public deleteUser!: UserResponse;
  key: string;

  //Data Table configs
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();

  @ViewChild('closeAddModal') closeAddModal: ElementRef
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef
  @ViewChild('closeEditModal') closeEditModal: ElementRef

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.searchForm = this.formBuilder.group({
      key: ['']
    });
  }

  ngOnInit() {
    this.loadDataTableConfigs();
    this.getUserList();
    this.initializeUserForm();
    this.initializeUserEditForm();
  }

  onClickDeleteUser(userId: number) {
    this.selectedUser = userId;
  }
  onClickEditUser(userId: number) {
    this.selectedUser = userId;
    this.loadSelectedUser(this.selectedUser);
  }

  loadSelectedUser(userId: number) {
    const selectedUser = this.users.filter(u => u.id === userId);
    if (selectedUser != null) {
      this.setValuesToEditForm(selectedUser[0]);
    }
  }

  setValuesToEditForm(user: UserResponse) {
    const userRole = this.setUserRole(user.roles[0].roleName);
    this.editUserForm.setValue({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.userName,
      address: user.address,
      mobile_number: user.mobileNumber,
      email: user.email,
      status: user.status,
      designation: user.designation,
      //group: user.group,
      roles: userRole,
    })
  }

  setUserRole(userRole: string): string {
    if(userRole === 'Admin') {
      return '1';
    }
    return '2';
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
      first_name: this.formBuilder.control('', Validators.required),
      last_name: this.formBuilder.control('', Validators.required),
      user_name: this.formBuilder.control('', Validators.required),
      address: this.formBuilder.control('', Validators.required),
      mobile_number: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      designation: this.formBuilder.control(''),
      // group: this.formBuilder.control(''),
      roles: this.formBuilder.control(''),
    });
  }

  initializeUserEditForm() {
    this.editUserForm = this.formBuilder.group({
      first_name: this.formBuilder.control('', Validators.required),
      last_name: this.formBuilder.control('', Validators.required),
      user_name: this.formBuilder.control('', Validators.required),
      address: this.formBuilder.control('', Validators.required),
      mobile_number: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      //password: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      designation: this.formBuilder.control(''),
      //group: this.formBuilder.control(''),
      roles: this.formBuilder.control(''),
    });
  }

  onUserAdd() {
    this.userService.addUser(this.addUserForm.value).subscribe(res => {
      if (res != null) {
        this.closeAddModal.nativeElement.click();
        this.getUserList();
      }
    });
  }

  onUserEdit() {
    this.userService.editUser(this.selectedUser, this.editUserForm.value).subscribe(res => {
      if (res != null) {
        this.getUserList();
        this.closeEditModal.nativeElement.click();
        this.selectedUser = 0;
      }
    });
  }

  onDeleteUser() {
    this.userService.deleteUser(this.selectedUser).subscribe(res => {
      if (res == null) {
        this.getUserList();
        this.closeDeleteModal.nativeElement.click();
        this.selectedUser = 0;
      }
    });
  }

  //   searchUser(value: string) {
  //     const searchKey = this.searchForm.value.key;
  //   }
}


