package com.e_commerce.authService.service.impl;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.List;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.authService.service.IOtpService;
import com.e_commerce.authService.configuration.OtpConfig;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OtpService implements IOtpService {

    private final StringRedisTemplate redisTemplate;
    private final OtpConfig otpConfig;

    private static final String OTP_PREFIX = "otp:";
    private static final int OTP_TTL_MINUTES = 5;

    @Override
    public String generateAndSaveOtp(String phone) {

        if (isWhitelisted(phone)) {
            return otpConfig.getWhitelistOtp();
        }

        String otp = String.valueOf(generateOtp());

        String key = OTP_PREFIX + phone;
        String storedOtp = redisTemplate.opsForValue().get(key);

        if (storedOtp != null) {
            return storedOtp;
        }

        redisTemplate.opsForValue()
                .set(key, otp, Duration.ofMinutes(OTP_TTL_MINUTES));

        return otp;
    }

    @Override
    public boolean verifyOtp(String phone, String otp) {

        if (isWhitelisted(phone) && otp.equals(otpConfig.getWhitelistOtp())) {
            return true;
        }

        String key = OTP_PREFIX + phone;
        String storedOtp = redisTemplate.opsForValue().get(key);

        if (storedOtp == null) {
            return false;
        }

        boolean isValid = storedOtp.equals(otp);

        if (isValid) {
            redisTemplate.delete(key); // one-time use
        }

        return isValid;
    }

    private boolean isWhitelisted(String phone) {
        if (!otpConfig.isWhitelistEnabled()) {
            return false;
        }

        List<String> whitelistPhones = otpConfig.getWhitelistPhones();

        return whitelistPhones != null && whitelistPhones.contains(phone);
    }

    private Integer generateOtp() {
        SecureRandom random = new SecureRandom();
        return 100000 + random.nextInt(900000);
    }
}