package com.e_commerce.authService.model.dto;

import java.util.List;

import com.e_commerce.common.model.dto.UserInfoDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class VerifyOtpResponse {
    private Boolean firstTimeLogin;
    private String role;
    private List<String> permissions;
    private UserInfoDTO userInfo;
}
