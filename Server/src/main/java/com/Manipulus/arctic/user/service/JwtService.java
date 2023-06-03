package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.user.Utils.JwtUtil;
import com.Manipulus.arctic.user.dao.UserDao;
import com.Manipulus.arctic.user.model.JwtRequest;
import com.Manipulus.arctic.user.model.JwtResponse;
import com.Manipulus.arctic.user.model.User;
import com.Manipulus.arctic.user.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Create JWT token
    public JwtResponse createJwtToken(JwtRequest jwtRequest)throws Exception{
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();
        authenticate(userName,userPassword); // authenticate user credentials

        final UserDetails userDetails = loadUserByUsername(userName);


        String newGeneratedToken = jwtUtil.generateToken(userDetails);// generate JWT token

         User user = userRepository.findUserByUserName(userName); //userDao.findById(userName).get();

         return new JwtResponse(user, newGeneratedToken); // return user details and JWT token
    }

    // Load user details by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUserName(username);

       if (user != null){
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getUserPassword(),
                    getAuthorities(user)

            );
       }else {
           throw new UsernameNotFoundException("Username is not valid");

       }
    }

    // Get user authorities
    private Set getAuthorities(User user){
        Set authorities  = new HashSet();

        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        });

        return authorities;
    }

    // Authenticate user credentials
    private void authenticate(String userName,  String userPassword)throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,userPassword));

        }catch (DisabledException e){
            throw new Exception("User is disabled");
        }catch (BadCredentialsException e){
             throw new Exception("Bad credentials from user");
        }
    }

}
