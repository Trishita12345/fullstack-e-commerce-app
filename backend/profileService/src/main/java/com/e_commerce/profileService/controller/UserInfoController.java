package com.e_commerce.profileService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.UserInfoDTO;
import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.service.IUserInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/userinfo")
@RequiredArgsConstructor
public class UserInfoController {

    private final IUserInfoService userInfoService;

    @GetMapping
    public ResponseEntity<UserInfoDTO> getUserInfo(Authentication authentication) {
        return ResponseEntity.ok(
                userInfoService.getUserDetailsByUserId(authentication.getName()));
    }

    @PutMapping
    public ResponseEntity<UserInfoDTO> updateUserInfo(@RequestBody UserInfoDTO updatedUserInfo,
            Authentication authentication) {
        return ResponseEntity.ok(userInfoService.updateUserDetailsByUserId(authentication.getName(), updatedUserInfo));
    }
}
