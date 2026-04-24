package com.e_commerce.authService.service;

import java.util.UUID;

import com.e_commerce.authService.model.RefreshToken;
import com.e_commerce.authService.model.User;

public interface IJwtService {
    String generateAccessToken(User user);

    String generateRefreshToken(UUID userId, String deviceId);

    RefreshToken validate(String token);

    void revoke(String token);

    String rotate(RefreshToken oldToken);
}
