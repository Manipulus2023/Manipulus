package com.Manipulus.arctic.user.controller;

import com.Manipulus.arctic.user.model.JwtRequest;
import com.Manipulus.arctic.user.model.JwtResponse;
import com.Manipulus.arctic.user.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtController {
    @Autowired
    private JwtService jwtService;

    // Handle POST requests to "/authenticate" endpoint
    @PostMapping({"/authenticate"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception{
        // Delegate request handling to JwtService and return JwtResponse
        return null; //jwtService.createJwtToken(jwtRequest);
    }
}
