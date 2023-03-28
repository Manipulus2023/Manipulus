package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.user.dao.RoleDao;
import com.Manipulus.arctic.user.dao.UserDao;
import com.Manipulus.arctic.user.model.Role;
import com.Manipulus.arctic.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
public class UserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public User registerNewUser(User user){

        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);

        user.setPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public void initRolesAndUser(){
        Role adminRole= new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole= new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role newly created record");
        roleDao.save(userRole);

      User adminUser=new User();
      adminUser.setFirst_name("admin");
      adminUser.setLast_name("admin");
      adminUser.setUsername("admin123");
      adminUser.setPassword(getEncodedPassword("admin@pass"));
      Set<Role>adminRoles= new HashSet<>();
      adminRoles.add(adminRole);
      adminUser.setRole(adminRoles);
      userDao.save(adminUser);

        User user=new User();
        user.setFirst_name("nethmini");
        user.setLast_name("kavindya");
        user.setUsername("neth123");
        user.setPassword(getEncodedPassword("neth@pass"));
        Set<Role>userRoles= new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);


    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
