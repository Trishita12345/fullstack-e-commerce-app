package com.e_commerce.common.filter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.e_commerce.common.security.UserHeaders;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

public class GatewayHeaderAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Prevent overriding existing authentication
        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            String userId = request.getHeader(UserHeaders.USER_ID);
            String rolesHeader = request.getHeader(UserHeaders.USER_ROLES);

            if (userId != null && rolesHeader != null) {

                var authorities = Arrays.stream(rolesHeader.split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                var authentication = new UsernamePasswordAuthenticationToken(
                        userId,
                        null,
                        authorities);

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
