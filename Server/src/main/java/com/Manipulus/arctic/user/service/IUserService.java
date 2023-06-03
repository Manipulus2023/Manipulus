package com.Manipulus.arctic.user.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

public interface IUserService {
    @Transactional
    UserDetails loadUserByUsername(String username);
}
