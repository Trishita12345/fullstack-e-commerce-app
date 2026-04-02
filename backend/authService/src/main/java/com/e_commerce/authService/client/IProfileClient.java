package com.e_commerce.authService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "profile-service", url = "${feign.client.profile-service.url}")
public interface IProfileClient {

    @PostMapping(path = "/internal/save-user")
    void saveUser(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam String phoneNumber,
            @RequestHeader("X-User-Roles") String role);
}
