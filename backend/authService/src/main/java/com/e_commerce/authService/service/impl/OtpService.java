package com.e_commerce.authService.service.impl;

import java.security.SecureRandom;
import java.time.Duration;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.authService.service.IOtpService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OtpService implements IOtpService {

    private final StringRedisTemplate redisTemplate;

    private static final String OTP_PREFIX = "otp:";
    private static final int OTP_TTL_MINUTES = 5;

    @Override
    public String generateAndSaveOtp(String phone) {
        String otp = String.valueOf(generateOtp());

        String key = OTP_PREFIX + phone;
        String storedOtp = redisTemplate.opsForValue().get(key);

        if (storedOtp != null)
            return storedOtp;

        redisTemplate.opsForValue()
                .set(key, otp, Duration.ofMinutes(OTP_TTL_MINUTES));

        return otp;
    }

    @Override
    public boolean verifyOtp(String phone, String otp) {
        String key = OTP_PREFIX + phone;

        String storedOtp = redisTemplate.opsForValue().get(key);

        if (storedOtp == null)
            return false;

        boolean isValid = storedOtp.equals(otp);

        if (isValid) {
            redisTemplate.delete(key); // one-time use
        }

        return isValid;
    }

    private Integer generateOtp() {
        SecureRandom random = new SecureRandom();
        return 100000 + random.nextInt(900000);
    }
}
