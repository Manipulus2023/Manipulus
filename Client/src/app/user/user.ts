export class User {
  id!: number;
  first_name: string;
  last_name: string;
  user_name!: string;
  address!: string;
  mobile_number!: string;
  email!: string;
  password!: string;
  status!: string;
  designation!: string;
 // group!: string;
  roles!: number;
}


export class UserResponse {
  id!: number;
  first_name: string;
  last_name: string;
  userName!: string;
  address!: string;
  mobileNumber!: string;
  email!: string;
  password!: string;
  status!: string;
  designation!: string;
  //group!: string;
  roles!: UserRole[];
}


export class UserRole {
  roleName: string;
  roleDescription: string;
}
