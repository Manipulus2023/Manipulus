package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.role.Role;
import com.Manipulus.arctic.user.dao.RoleDao;
import com.Manipulus.arctic.user.dao.UserDao;
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
        Role role = roleDao.findById(1).get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);
        user.setPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public void initRolesAndUser() {
        Role adminRole = new Role();
        Set<Role> adminRoles = new HashSet<> ();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);
        adminRoles.add(adminRole);

        User adminUser = new User();
        adminUser.setFirst_name("Admin");
        adminUser.setLast_name("Person");
        adminUser.setUsername("admin123");
        adminUser.setEmail("admin.user@test.lk");
        adminUser.setPassword(getEncodedPassword("admin@pass"));
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        Role userRole = new Role();
        Set<Role>userRoles= new HashSet<>();
        userRole.setRoleName("User");
        userRole.setRoleDescription("User role");
        userRoles.add(userRole);
        roleDao.save(userRole);

        User user = new User();
        user.setFirst_name("Nethmini");
        user.setLast_name("Kavindya");
        user.setUsername("neth123");
        user.setEmail("nethmini.kavindya@test.lk");
        user.setPassword(getEncodedPassword("neth@pass"));
        user.setRole(userRoles);
        userDao.save(user);
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
