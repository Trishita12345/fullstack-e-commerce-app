package com.e_commerce.authService.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "refresh_tokens")
public class RefreshToken extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String token;

    @Column(unique = true, nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private Instant expiry;

    @Builder.Default
    private boolean revoked = false;

    @Column(nullable = false)
    private String deviceId;

    public boolean isValid() {
        return !revoked && expiry.isAfter(Instant.now());
    }
}