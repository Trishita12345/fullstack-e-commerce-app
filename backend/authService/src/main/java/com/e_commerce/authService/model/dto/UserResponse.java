package com.e_commerce.authService.model.dto;

import com.e_commerce.authService.model.User;
import com.e_commerce.common.model.dto.UserInfoDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse {
    private User user;
    private Boolean firstTimeLogin;
    private UserInfoDTO userInfo;
}
