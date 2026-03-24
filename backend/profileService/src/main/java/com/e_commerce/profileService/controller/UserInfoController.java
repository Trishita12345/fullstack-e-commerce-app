package com.e_commerce.profileService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.model.dto.BetterAuthUser;
import com.e_commerce.profileService.service.IUserInfoService;

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
    public ResponseEntity<Void> saveUserInfo(@RequestBody BetterAuthUser authUser, Authentication authentication) {

        System.out.print("userid" + authUser.getId());
        userInfoService.saveUserDetails(authentication.getName(), authUser);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo updatedUserInfo,
            Authentication authentication) {
        return ResponseEntity.ok(userInfoService.updateUserDetailsByUserId(authentication.getName(), updatedUserInfo));

    }
}
