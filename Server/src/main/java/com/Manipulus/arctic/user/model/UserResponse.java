package com.Manipulus.arctic.user.model;

import com.Manipulus.arctic.role.model.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class UserResponse {
    public String user_name;
    public String first_name;
    public String last_name;
    public String address;
    public String mobile_number;

    public String email;

    public String password;

    public String status;
    public String designation;
   // public String group;
     public ArrayList<String> roles;
}
