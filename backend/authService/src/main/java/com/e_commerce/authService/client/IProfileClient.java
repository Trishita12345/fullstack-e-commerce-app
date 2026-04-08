package com.e_commerce.authService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.e_commerce.common.model.dto.UserInfoDTO;

@FeignClient(name = "profile-service", url = "${feign.client.profile-service.url}")
public interface IProfileClient {

    @PostMapping(path = "/public/internal/save-user")
    UserInfoDTO saveUser(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam String phoneNumber,
            @RequestHeader("X-User-Roles") String role);
}
