package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IUserService {
    User loadUserByEmail(String email);
    User loadUserByUsername(String username);

    List<User> getUsers();

    User findUserById(Long id);

    User addUser(User user);

    void deleteUserById(int id);
}
