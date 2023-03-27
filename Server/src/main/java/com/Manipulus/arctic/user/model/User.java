package com.Manipulus.arctic.user.model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "user")
public class User implements Serializable {


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)

    private long id;

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToMany(fetch=FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE",
    joinColumns = {
            @JoinColumn(name = "USER_ID")
    },
            inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")
            }

    )
    private Set<Role> role;

   // public long getId() {
     //   return id;
   // }

   // public void setId(long id) {
     //   this.id = id;
   // }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) { this.username = username;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public String getUserEmail() {
       return email;
    }
   public String getUserPassword() {
      return password;
    }
}
