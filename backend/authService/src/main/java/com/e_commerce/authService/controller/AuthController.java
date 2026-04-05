package com.e_commerce.authService.controller;

import java.time.Duration;
import java.util.Arrays;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.authService.model.dto.OTpVerifyRequest;
import com.e_commerce.authService.model.dto.TokenResponse;
import com.e_commerce.authService.model.dto.VerifyOtpResponse;
import com.e_commerce.authService.model.dto.VerifyOtpResponseWithToken;
import com.e_commerce.authService.service.IAuthApplicationService;
import com.e_commerce.authService.utils.Constants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

        private final IAuthApplicationService authService;

        @PostMapping("/request-otp")
        public ResponseEntity<Void> requestOtp(@RequestBody Map<String, String> request) {
                authService.requestOtp(request.get("phone"));
                return ResponseEntity.noContent().build();
        }

        @PostMapping("/verify-otp")
        public ResponseEntity<VerifyOtpResponse> verifyOtp(@RequestBody OTpVerifyRequest request,
                        HttpServletResponse response) {

                VerifyOtpResponseWithToken verifyOtpResponse = authService.verifyOtp(
                                request.getPhone(),
                                request.getOtp(),
                                request.getDeviceId());

                setTokenInCookie(response, verifyOtpResponse.getAccessToken(), verifyOtpResponse.getRefreshToken());

                return ResponseEntity.ok(
                                new VerifyOtpResponse(
                                                verifyOtpResponse.getFirstTimeLogin(),
                                                verifyOtpResponse.getRole(),
                                                verifyOtpResponse.getPermissions(),
                                                verifyOtpResponse.getUserInfo()));
        }

        private void setTokenInCookie(HttpServletResponse response, String accessToken, String refreshToken) {

                ResponseCookie accessCookie = ResponseCookie.from(Constants.ACCESS_TOKEN, accessToken)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .maxAge(Duration.ofMinutes(15))
                                .domain(".loomandlume.shop")
                                .sameSite("None")
                                .build();

                ResponseCookie refreshCookie = ResponseCookie.from(Constants.REFRESH_TOKEN, refreshToken)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .maxAge(Duration.ofDays(7))
                                .domain(".loomandlume.shop")
                                .sameSite("None")
                                .build();

                response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
                response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        }

        @PostMapping("/refresh")
        public ResponseEntity<String> refresh(HttpServletRequest request,
                        HttpServletResponse response) {
                try {
                        TokenResponse tokenResponse = authService.refresh(getRefreshTokenFromCookie(request));
                        setTokenInCookie(response, tokenResponse.getAccessToken(), tokenResponse.getRefreshToken());
                        return ResponseEntity.ok("Token Refreshed successfully");
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }

        }

        private String getRefreshTokenFromCookie(HttpServletRequest request) {
                log.info(Arrays.toString(request.getCookies()));
                String refreshToken = Arrays.stream(request.getCookies())
                                .filter(c -> c.getName().equals(Constants.REFRESH_TOKEN))
                                .findFirst()
                                .map(Cookie::getValue)
                                .orElseThrow(() -> new RuntimeException("No refresh token"));
                return refreshToken;
        }

        @GetMapping("/logout")
        public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
                ResponseCookie accessCookie = ResponseCookie.from(Constants.ACCESS_TOKEN, "")
                                .httpOnly(true)
                                .secure(true)
                                .path("/") // MUST match original
                                .domain(".loomandlume.shop") // MUST match original
                                .maxAge(0) // 🔥 delete immediately
                                .sameSite("None")
                                .build();

                ResponseCookie refreshCookie = ResponseCookie.from(Constants.REFRESH_TOKEN, "")
                                .httpOnly(true)
                                .secure(true)
                                .path("/") // match original
                                .domain(".loomandlume.shop")
                                .maxAge(0)
                                .sameSite("None")
                                .build();

                response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
                response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

                authService.logout(getRefreshTokenFromCookie(request));

                return ResponseEntity.noContent().build();
        }
}
