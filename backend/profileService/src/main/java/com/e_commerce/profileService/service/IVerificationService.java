package com.e_commerce.profileService.service;

public interface IVerificationService {
    boolean verifyEmail(String email, String verificationCode);

    void generateEmailVerification(String email);

    boolean verifyPhoneNumber(String phoneNumber, String verificationCode);

    void generatePhoneNumberVerification(String phoneNumber);
}
