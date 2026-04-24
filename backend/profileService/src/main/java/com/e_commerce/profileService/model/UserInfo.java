package com.e_commerce.profileService.model;

import java.util.Date;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;
import com.e_commerce.common.model.enums.Gender;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_info")
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String phoneNumber;

    private String emailId;

    @Builder.Default
    private Boolean emailVerified = false;

    @Column(nullable = false)
    private String fullName;

    private Gender gender;
    private Date dob;

}
