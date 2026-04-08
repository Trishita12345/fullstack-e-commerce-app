package com.e_commerce.profileService.service.impl;

import java.security.SecureRandom;
import java.time.Duration;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.profileService.kafka.ProfileVerificationEventProducer;
import com.e_commerce.profileService.service.IVerificationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerificationService implements IVerificationService {

    private final StringRedisTemplate redisTemplate;
    private final static String VERIFICATION_KEY_STRING = "verification:{}:{}"; // verification:{email/phone}:{value}
    private final static int VERIFICATION_CODE_TTL_MINUTES = 5;

    private final ProfileVerificationEventProducer profileVerificationEventProducer;

    @Override
    public boolean verifyEmail(String email, String verificationCode) {
        String key = VERIFICATION_KEY_STRING.formatted("email", email);
        String storedCode = redisTemplate.opsForValue().get(key);
        boolean isVerified = storedCode != null && storedCode.equals(verificationCode);
        if (isVerified) {
            redisTemplate.delete(key);
        }
        return isVerified;
    }

    @Override
    public void generateEmailVerification(String email) {
        String key = VERIFICATION_KEY_STRING.formatted("email", email);
        String code = redisTemplate.opsForValue().get(key);
        if (code == null) {
            code = String.valueOf(generateVerificationCode());
            redisTemplate.opsForValue().set(key, code,
                    Duration.ofMinutes(VERIFICATION_CODE_TTL_MINUTES));
        }
        profileVerificationEventProducer.publishEmailVerificationCode(email, code);

    }

    @Override
    public boolean verifyPhoneNumber(String phoneNumber, String verificationCode) {
        String key = VERIFICATION_KEY_STRING.formatted("phone", phoneNumber);
        String storedCode = redisTemplate.opsForValue().get(key);
        boolean isVerified = storedCode != null && storedCode.equals(verificationCode);
        if (isVerified) {
            redisTemplate.delete(key);
        }
        return isVerified;
    }

    @Override
    public void generatePhoneNumberVerification(String phoneNumber) {
        String key = VERIFICATION_KEY_STRING.formatted("phone", phoneNumber);
        String code = redisTemplate.opsForValue().get(key);
        if (code == null) {
            code = String.valueOf(generateVerificationCode());
            redisTemplate.opsForValue().set(key, code,
                    Duration.ofMinutes(VERIFICATION_CODE_TTL_MINUTES));
        }
        // TODO: Integrate with SMS service to send the verification code to the user's
        // phone number
    }

    private Integer generateVerificationCode() {
        SecureRandom random = new SecureRandom();
        return 100000 + random.nextInt(900000);
    }
}
