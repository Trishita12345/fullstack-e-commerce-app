package com.e_commerce.authService.service.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;

import com.e_commerce.authService.client.IProfileClient;
import com.e_commerce.authService.model.User;
import com.e_commerce.authService.model.dto.UserResponse;
import com.e_commerce.authService.repository.RoleRepository;
import com.e_commerce.authService.repository.UserRepository;
import com.e_commerce.authService.service.IUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final IProfileClient profileClient;

        @Override
        @Transactional
        public UserResponse getOrCreateUser(String phone) {
                Optional<User> userOptional = userRepository.findByPhoneNo(phone);
                if (userOptional.isPresent()) {
                        return UserResponse.builder()
                                        .user(userOptional.get())
                                        .firstTimeLogin(false)
                                        .build();
                }
                User user = User.builder()
                                .phoneNo(phone)
                                .role(roleRepository.findByRoleName("USER")
                                                .orElseThrow(() -> new RuntimeException("Default role not found")))
                                .build();
                User savedUser = userRepository.save(user);
                profileClient.saveUser(savedUser.getUserId().toString(), phone, savedUser.getRole().getRoleName());
                return UserResponse.builder()
                                .user(savedUser)
                                .firstTimeLogin(true)
                                .build();
        }

        @Override
        public User getById(UUID userId) {
                return userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));
        }
}