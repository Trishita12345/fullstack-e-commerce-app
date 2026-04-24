package com.e_commerce.authService.service;

public interface IOtpService {
    String generateAndSaveOtp(String phone);

    boolean verifyOtp(String phone, String otp);
}
