package com.e_commerce.authService.service.impl;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.e_commerce.authService.model.Permission;
import com.e_commerce.authService.model.RefreshToken;
import com.e_commerce.authService.model.User;
import com.e_commerce.authService.repository.RefreshTokenRepository;
import com.e_commerce.authService.service.IJwtService;
import com.e_commerce.common.exception.BaseException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService {

    private final KeyPair keyPair;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public String generateAccessToken(User user) {

        Instant now = Instant.now();

        // Extract roles
        String role = user.getRole().getRoleName();

        // Extract permissions
        List<String> permissions = user.getRole().getPermissions()
                .stream()
                .map(Permission::getPermissionName)
                .toList();

        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject(user.getUserId().toString())
                .claim("role", role)
                .claim("permissions", permissions)
                .issuer("auth-service")
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plusSeconds(900))) // 15 min
                .build();

        try {
            RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

            JWSSigner signer = new RSASSASigner(privateKey);

            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.RS256)
                            .keyID("auth-key") // important for JWK
                            .build(),
                    claims);

            signedJWT.sign(signer);

            return signedJWT.serialize();

        } catch (Exception e) {
            throw new BaseException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR, "AUTH_JWT_ERROR");
        }
    }

    @Override
    public String generateRefreshToken(UUID userId, String deviceId) {

        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = new RefreshToken(
                null,
                token,
                userId,
                Instant.now().plus(Duration.ofDays(7)),
                false,
                deviceId);

        refreshTokenRepository.save(refreshToken);

        return token;
    }

    @Override
    public RefreshToken validate(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new BaseException("Invalid refresh token", HttpStatus.BAD_REQUEST,
                        "AUTH_INVALID_REFRESH_TOKEN"));

        if (!refreshToken.isValid()) {
            throw new BaseException("Expired or revoked refresh token", HttpStatus.BAD_REQUEST,
                    "AUTH_EXPIRED_REVOKED_REFRESH_TOKEN");
        }

        return refreshToken;
    }

    @Override
    public void revoke(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(
                        () -> new BaseException("Token not found", HttpStatus.BAD_REQUEST, "AUTH_TOKEN_NOT_FOUND"));

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public String rotate(RefreshToken oldToken) {

        // revoke old
        oldToken.setRevoked(true);
        refreshTokenRepository.save(oldToken);

        // create new
        return generateRefreshToken(oldToken.getUserId(), oldToken.getDeviceId());
    }

}
