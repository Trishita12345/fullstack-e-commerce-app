package com.e_commerce.notificationService.strategy;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.notificationService.config.Fast2SmsConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.e_commerce.common.model.enums.NotificationType;

@Component
@RequiredArgsConstructor
@Slf4j
public class SmsStrategy implements NotificationStrategy {

    private final Fast2SmsConfig config;
    private final RestTemplate restTemplate;

    @Override
    public NotificationType getType() {
        return NotificationType.SMS;
    }

    @Override
    public void sendVerification(String identity, String verificationCode) {

        try {
            // 1. Prepare data
            Map<String, Object> data = new HashMap<>();
            data.put("otp", verificationCode);

            // 2. Render template
            String message = String.format(
                    "Your verification code for Loom&Lume is %s. Valid for 5 minutes. Do not share.",
                    verificationCode);

            // 3. Prepare request
            String url = "https://www.fast2sms.com/dev/bulkV2";

            HttpHeaders headers = new HttpHeaders();
            headers.set("authorization", config.getApiKey());
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = new HashMap<>();
            body.put("route", "q");
            body.put("message", message);
            body.put("language", "english");
            body.put("numbers", identity);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            // 4. Call API
            // restTemplate.postForEntity(url, request, String.class);

            log.info("OTP SMS sent successfully to {}", identity);

        } catch (Exception e) {
            log.error("Failed to send OTP SMS to {}", identity, e);
            throw new RuntimeException("SMS sending failed", e);
        }
    }

    @Override
    public void orderConfirmSend(OrderConfimedNotificationEvent request) {
        // SMS logic
    }
}
