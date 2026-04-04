package com.e_commerce.common.model.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import com.e_commerce.common.model.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {

    private UUID id;

    private String userId;

    private String phoneNumber;

    private String emailId;

    private String fullName;

    private Gender gender;
    private Date dob;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
