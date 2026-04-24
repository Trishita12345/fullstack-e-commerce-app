package com.e_commerce.authService.model;

import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
public class Permission extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID permissionId;

    @Column(unique = true, nullable = false)
    private String permissionName;
}
