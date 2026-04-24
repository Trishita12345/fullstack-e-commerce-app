package com.e_commerce.authService.service;

import java.util.UUID;

import com.e_commerce.authService.model.User;
import com.e_commerce.authService.model.dto.UserResponse;

public interface IUserService {
    UserResponse getOrCreateUser(String phone);

    User getById(UUID userId);
}
