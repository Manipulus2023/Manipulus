package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.role.model.Role;
import com.Manipulus.arctic.role.repository.IRoleRepository;
import com.Manipulus.arctic.user.model.User;
import com.Manipulus.arctic.user.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public User registerNewUser(User user){
        Role role = roleRepository.findById(1).get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);
        user.setPassword(getEncodedPassword(user.getUserPassword()));
        return userRepository.save(user);
    }

    public void initRolesAndUser() {
        boolean isAdminExisting = userRepository.existsById(1);
        boolean isUserExisting = userRepository.existsById(2);

        if(!isAdminExisting) {
            Role adminRole = new Role();
            Set<Role> adminRoles = new HashSet<> ();
            adminRole.setRoleName("Admin");
            adminRole.setRoleDescription("Admin role");
            roleRepository.save(adminRole);
            adminRoles.add(adminRole);

            User adminUser = new User();
            adminUser.setFirst_name("Admin");
            adminUser.setLast_name("Person");
            adminUser.setUsername("admin123");
            adminUser.setEmail("admin.user@test.lk");
            adminUser.setPassword(getEncodedPassword("admin@pass"));
            adminUser.setRole(adminRoles);
            userRepository.save(adminUser);
        }

        if(!isUserExisting) {
            Role userRole = new Role();
            Set<Role>userRoles= new HashSet<>();
            userRole.setRoleName("User");
            userRole.setRoleDescription("User role");
            userRoles.add(userRole);
            roleRepository.save(userRole);

            User user = new User();
            user.setFirst_name("Nethmini");
            user.setLast_name("Kavindya");
            user.setUsername("neth123");
            user.setEmail("nethmini.kavindya@test.lk");
            user.setPassword(getEncodedPassword("neth@pass"));
            user.setRole(userRoles);
            userRepository.save(user);
        }
    }
    public String getEncodedPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
 }
