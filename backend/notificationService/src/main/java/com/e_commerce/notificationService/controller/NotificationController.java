package com.e_commerce.notificationService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.enums.NotificationType;
import com.e_commerce.notificationService.service.impl.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestParam String identity, @RequestParam String verificationCode) {
        notificationService.sendVerification(NotificationType.SMS, identity, verificationCode);

        return ResponseEntity.ok("Sent");
    }
}
