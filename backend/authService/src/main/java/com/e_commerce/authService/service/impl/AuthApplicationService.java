package com.e_commerce.authService.service.impl;

import org.springframework.stereotype.Service;

import com.e_commerce.authService.model.RefreshToken;
import com.e_commerce.authService.model.User;
import com.e_commerce.authService.model.dto.TokenResponse;
import com.e_commerce.authService.model.dto.UserResponse;
import com.e_commerce.authService.model.dto.VerifyOtpResponseWithToken;
import com.e_commerce.authService.service.IAuthApplicationService;
import com.e_commerce.authService.service.IJwtService;
import com.e_commerce.authService.service.IOtpService;
import com.e_commerce.authService.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthApplicationService implements IAuthApplicationService {

    private final IOtpService otpService;
    private final IUserService userService;
    private final IJwtService jwtService;

    public void requestOtp(String phone) {
        String otp = otpService.generateAndSaveOtp(phone);

        // TODO: integrate SMS later
        System.out.println("OTP for " + phone + ": " + otp);
    }

    public VerifyOtpResponseWithToken verifyOtp(String phone, String otp, String deviceId) {
        if (otp == null) {
            throw new RuntimeException("OTP must be provided");
        }
        if (!otpService.verifyOtp(phone, otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        UserResponse user = userService.getOrCreateUser(phone);

        String accessToken = jwtService.generateAccessToken(user.getUser());
        String refreshToken = jwtService.generateRefreshToken(user.getUser().getUserId(), deviceId);

        return new VerifyOtpResponseWithToken(accessToken, refreshToken, user.getFirstTimeLogin(),
                user.getUser().getRole().getRoleName(),
                user.getUser().getRole().getPermissions().stream().map(p -> p.getPermissionName()).toList());
    }

    @Override
    public TokenResponse refresh(String refreshToken) {

        RefreshToken token = jwtService.validate(refreshToken);

        User user = userService.getById(token.getUserId());

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user.getUserId(), token.getDeviceId());

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(String refreshToken) {
        jwtService.revoke(refreshToken);
    }
}
