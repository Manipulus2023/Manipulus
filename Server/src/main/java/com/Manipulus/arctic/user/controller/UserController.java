package com.Manipulus.arctic.user.controller;

import com.Manipulus.arctic.user.model.User;
import com.Manipulus.arctic.user.repository.IUserRepository;
import com.Manipulus.arctic.user.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.PanelUI;
import java.util.Map;

@RestController
//@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRolesAndUsers() {
        userService.initRolesAndUser();
    }

    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user){
        return userService.registerNewUser(user);
    }

    @GetMapping({"/forAdmin"})
    public String forAdmin(){
        return "This URL is only accessible to admin";
    }

    @GetMapping({"/forUser"})
    public String forUser(){
        return "This URL is only accessible to user";
    }
   // @Autowired
   // private IUserRepository userRepository;

    /*@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userData){
        System.out.println(userData);
        User user =userRepository.findUserByEmail(userData.getUserEmail());
        if (user.getUserPassword().equals(userData.getUserPassword()))
            return ResponseEntity.ok(user);
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }*/

    /*@PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestBody Map<String, String> request) {
        /*String email = request..("email");
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Generate reset password token and send to user's email address

        return new ResponseEntity<>(HttpStatus.OK);
        return null;
    }*/
}
