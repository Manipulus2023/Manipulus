package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.user.model.User;
import org.springframework.stereotype.Service;

public interface IUserService {
    User loadUserByEmail(String email);
    User loadUserByUsername(String username);
}
