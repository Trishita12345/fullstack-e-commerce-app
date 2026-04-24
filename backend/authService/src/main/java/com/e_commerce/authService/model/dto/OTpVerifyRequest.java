package com.e_commerce.authService.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OTpVerifyRequest {

    private String phone;
    private String otp;
    private String deviceId;
}
