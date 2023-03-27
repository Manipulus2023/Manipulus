package com.Manipulus.arctic.user.configuration;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class WebSecurityConfiguration implements WebSecurityConfigurerAdapter {

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Override
    public void init(SecurityBuilder builder) throws Exception {

    }

    @Override
    public void configure(SecurityBuilder builder) throws Exception {

    }
}
