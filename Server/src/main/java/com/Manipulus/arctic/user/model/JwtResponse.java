package com.Manipulus.arctic.user.model;

import java.util.List;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Integer id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String jwtToken, Integer id, String username, String email, List<String> roles) {
        this.token = jwtToken;
        this.email = email;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
