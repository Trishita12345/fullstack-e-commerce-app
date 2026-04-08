package com.e_commerce.profileService.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.AddressDTO;
import com.e_commerce.common.model.dto.UserInfoDTO;
import com.e_commerce.profileService.service.IAddressService;
import com.e_commerce.profileService.service.IUserInfoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/public/internal")
@AllArgsConstructor
public class InternalController {

    private final IAddressService addressService;
    private final IUserInfoService userInfoService;

    @GetMapping("/address/{addressId}")
    public ResponseEntity<AddressDTO> getAddressbyId(@PathVariable UUID addressId) {
        return ResponseEntity.ok(addressService.getAddressbyId(addressId));
    }

    @GetMapping("/get-user-info/{userId}")
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable String userId) {
        return ResponseEntity.ok(userInfoService.getUserInfo(userId));
    }

    @PostMapping("/save-user")
    public ResponseEntity<UserInfoDTO> saveUser(@RequestHeader("X-User-Id") String userId,
            @RequestParam String phoneNumber,
            @RequestHeader("X-User-Roles") String role) {
        UserInfoDTO userInfoDTO = userInfoService.saveUserDetails(userId, phoneNumber);
        return ResponseEntity.ok(userInfoDTO);
    }
}
