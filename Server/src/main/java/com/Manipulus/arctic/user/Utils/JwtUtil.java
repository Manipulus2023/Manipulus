package com.Manipulus.arctic.user.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET_KEY="secret";

    private static final int TOKEN_VALIDITY = 3600*5;

    public String getUserNameFromToken(String token){
        return getClaimFromToken(token,Claims::getSubject);
    }

    // Get a specific claim from a JWT token
    private <T> T getClaimFromToken(String token, Function<Claims,T> claimResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
    }

    // Parse a JWT token and retrieve all its claims
    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Validate whether a JWT token is still valid for the given user
    public boolean validateToken(String token, UserDetails userDetails){
       String userName = getUserNameFromToken(token);
       return ( userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Check whether a JWT token has expired
    private boolean isTokenExpired(String token){
       final Date expirationDate = getExpirationDateFromToken(token);
       return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }


    // Generate a new JWT token for the given user details
    public String generateToken(UserDetails userDetails){
        // Create an empty map of claims
        Map<String, Object> claims = new HashMap<>();

        // Build the JWT token
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .compact();
    }
}
