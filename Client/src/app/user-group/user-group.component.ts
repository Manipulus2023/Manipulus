import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent {


  // Add this property and method to the component class
isFormVisible = false;

toggleFormVisibility() {
  this.isFormVisible = !this.isFormVisible;
}

validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

validatePassword(password: string): boolean {
  // Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
}





    toggleFormInVisibility() {
      this.isFormVisible = !this.isFormVisible;
    }


  UserArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  username: string = "";
  password: string = "";
  role: string = "";
  email: string = "";

  currentUserID = "";

  constructor(private http: HttpClient) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get("http://localhost:8080/api/v1/user/getAllUsers")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.UserArray = resultData;
      });
  }

  register() {
    let bodyData = {
      "name": this.username,
      "password": this.password,
      "role": this.role,
      "email": this.email
    };


    if (!this.username || !this.password || !this.role || !this.email) {

      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'All Details Required !',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',


        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });

    }

    else if (!this.validateEmail(this.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      return;
    }

    else if (!this.validatePassword(this.password)) {
      Swal.fire({
        title: 'Invalid Password',
        text: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      return;
    }

    else{

    this.http.post("http://localhost:8080/api/v1/user/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      Swal.fire({
        title: 'User Registration is Successfull',
        //  text: 'Please insert an existing NIC number!',
        icon: 'success',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      this.getAllUsers();

      this.username = '';
      this.password = '';
      this.role = '';
      this.email = '';
    });

  


    this.isFormVisible = !this.isFormVisible;
  }

  }

  setUpdate(data: any) {

    
    this.isFormVisible = !this.isFormVisible;
    this.username = data.name;
    this.password = data.password;
    this.role = data.role;
    this.email = data.email;
    this.currentUserID = data.id;

  }

  updateRecords() {
    let bodyData = {
      "id": this.currentUserID,
      "name": this.username,
      "password": this.password,
      "role": this.role,
      "email": this.email
    };


    
    if (!this.username || !this.password || !this.role || !this.email) {

      Swal.fire({
        title: 'Edit The Form Correctly',
        text: 'All Details Required !',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',


        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });

    }

   
  
    else if (!this.validateEmail(this.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      return;
    }
    else if (!this.validatePassword(this.password)) {
      Swal.fire({
        title: 'Invalid Password',
        text: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
        icon: 'error',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      return;
    }

    else{

    this.http.put("http://localhost:8080/api/v1/user/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      Swal.fire({
        title: 'User Details is Updated Successfully',
        //  text: 'Please insert an existing NIC number!',
        icon: 'success',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      this.getAllUsers();

      this.username = '';
      this.password = '';
      this.role = '';
      this.email = '';
    });
    
    
    this.isFormVisible = !this.isFormVisible;
    setTimeout(() => {
      window.location.reload();
    }, 1500);

   }

 


  
  }
  

  save() {
    if (this.currentUserID == '') {
      this.register();
    } else {
      this.updateRecords();
    }


  }

  setDelete(data: any) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      position: 'top',
      width: '500px',
      imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
      imageHeight: '100px',
      imageWidth: '100px',
      confirmButtonColor: '#3085d6',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary',
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(data.id);
      }
    });
  }
  
  deleteUser(userId: string) {
    this.http.delete("http://localhost:8080/api/v1/user/deleteuser" + "/" + userId, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      Swal.fire({
        title: 'Delete is Successful',
        icon: 'success',
        position: 'top',
        width: '500px',
        imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
        imageHeight: '100px',
        imageWidth: '100px',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      });
      this.getAllUsers();
    });
  }
  
}
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

