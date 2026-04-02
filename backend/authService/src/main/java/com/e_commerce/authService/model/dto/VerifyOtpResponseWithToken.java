package com.e_commerce.authService.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class VerifyOtpResponseWithToken {
    private String accessToken;
    private String refreshToken;
    private Boolean firstTimeLogin;
    private String role;
    private List<String> permissions;
}
