package com.e_commerce.profileService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProfileVerificationEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishEmailVerificationCode(String email, String verificationCode) {
        kafkaTemplate.send(Constants.EMAIL_VERIFICATION_NOTIFY_TOPIC, email, verificationCode);
    }
}
