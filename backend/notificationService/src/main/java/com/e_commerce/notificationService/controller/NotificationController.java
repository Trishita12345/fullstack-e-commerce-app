package com.e_commerce.notificationService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
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
    public ResponseEntity<String> send(@RequestBody OrderConfimedNotificationEvent request) {
        notificationService.orderConfirmSend(request);

        return ResponseEntity.ok("Sent");
    }
}
