package com.e_commerce.profileService.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class BetterAuthUser {
    private String id;
    private String name;
    private String email;
    private boolean emailVerified;
    private String image;
}
