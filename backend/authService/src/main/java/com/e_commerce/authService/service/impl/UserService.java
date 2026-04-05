package com.e_commerce.authService.service.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.authService.client.IProfileClient;
import com.e_commerce.authService.model.User;
import com.e_commerce.authService.model.dto.UserResponse;
import com.e_commerce.authService.repository.RoleRepository;
import com.e_commerce.authService.repository.UserRepository;
import com.e_commerce.authService.service.IUserService;
import com.e_commerce.common.model.dto.UserInfoDTO;

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
                User savedUser = new User();
                Boolean firstTimeLogin;
                if (userOptional.isPresent()) {
                        savedUser = userOptional.get();
                        firstTimeLogin = false;
                } else {
                        firstTimeLogin = true;
                        User user = User.builder()
                                        .phoneNo(phone)
                                        .role(roleRepository.findByRoleName("USER")
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Default role not found")))
                                        .build();
                        savedUser = userRepository.save(user);
                }
                UserInfoDTO userInfoDTO = profileClient.saveUser(savedUser.getUserId().toString(), phone,
                                savedUser.getRole().getRoleName());
                return UserResponse.builder()
                                .user(savedUser)
                                .userInfo(userInfoDTO)
                                .firstTimeLogin(firstTimeLogin)
                                .build();
        }

        @Override
        public User getById(UUID userId) {
                return userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));
        }
}