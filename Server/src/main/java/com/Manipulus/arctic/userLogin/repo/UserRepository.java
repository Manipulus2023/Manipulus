package com.Manipulus.arctic.userLogin.repo;

import com.Manipulus.arctic.userLogin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
