package com.e_commerce.authService.service;

import com.e_commerce.authService.model.dto.TokenResponse;

public interface IAuthApplicationService {
    void requestOtp(String phone);

    TokenResponse verifyOtp(String phone, String otp, String deviceId);

    TokenResponse refresh(String refreshToken);

    void logout(String refreshToken);
}
