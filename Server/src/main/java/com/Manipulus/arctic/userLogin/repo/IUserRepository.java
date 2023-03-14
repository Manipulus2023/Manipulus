package com.Manipulus.arctic.userLogin.repo;
import com.Manipulus.arctic.userLogin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface IUserRepository extends JpaRepository<User,String> {
    User findByUsername(String username);
}
