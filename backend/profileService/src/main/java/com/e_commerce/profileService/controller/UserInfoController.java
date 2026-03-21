package com.e_commerce.profileService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.model.dto.BetterAuthUser;
import com.e_commerce.profileService.service.IUserInfoService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/userinfo")
@RequiredArgsConstructor
public class UserInfoController {

    private final IUserInfoService userInfoService;

    @GetMapping
    public ResponseEntity<UserInfo> getUserInfo(Authentication authentication) {
        return ResponseEntity.ok(
                userInfoService.getUserDetailsByUserId(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<String> saveUserInfo(Authentication authentication, @RequestBody BetterAuthUser authUser) {

        userInfoService.saveUserDetails(authentication.getName(), authUser);
        return ResponseEntity.ok("User Details saved successfully");
    }

    @PutMapping
    public ResponseEntity<UserInfo> updateUserInfo(Authentication authentication,
            @RequestBody UserInfo updatedUserInfo) {
        return ResponseEntity.ok(userInfoService.updateUserDetailsByUserId(authentication.getName(), updatedUserInfo));

    }
}
