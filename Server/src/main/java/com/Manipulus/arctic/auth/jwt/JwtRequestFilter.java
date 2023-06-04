package com.Manipulus.arctic.auth.jwt;

import com.Manipulus.arctic.auth.jwt.JwtUtils;
import com.Manipulus.arctic.user.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Extract JWT token from the "Authorization" header in the HTTP request
        final String header = request.getHeader("Authorization");

        String jwtToken=null;
        String userName=null;
        if(header!=null && header.startsWith("Bearer ")){
            jwtToken=header.substring(7);

            try{
                // Get username from JWT token using JwtUtil's getUserNameFromToken method
            userName=jwtUtil.getUserNameFromToken(jwtToken);
            }catch(IllegalArgumentException e){
                System.out.println("Unable to get JWT token");
            }catch(ExpiredJwtException e){
                System.out.println("JWT token is expired");
            }


        }else{
            System.out.println("Jwt token does not start with Bearer!");
        }

        // If username is found and user is not already authenticated, load user details using JwtService and validate JWT token using JwtUtil's validateToken method
        if (userName != null && SecurityContextHolder.getContext().getAuthentication()==null ){
           UserDetails userDetails = jwtService.loadUserByUsername(userName);

           if(jwtUtil.validateToken(jwtToken,userDetails)){
               // Create a new authentication token using the loaded user details and set the SecurityContext's authentication object to the new token
               UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                       new UsernamePasswordAuthenticationToken(userDetails,
                       null,
                       userDetails.getAuthorities());

               usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

               SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
           }
        }
        // Pass the request and response to the next filter in the chain
        filterChain.doFilter(request,response);
    }
}
