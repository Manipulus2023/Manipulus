package com.Manipulus.arctic.userLogin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "loginUser")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class User {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private Long userid;
    private String username;
    private String password;
    private String email;


    public void setUserid(Long id) {
        this.userid = id;
    }

    public Long getUserid() {
        return userid;
    }
}
