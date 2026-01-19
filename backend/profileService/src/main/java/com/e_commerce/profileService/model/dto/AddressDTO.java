package com.e_commerce.profileService.model.dto;

import java.util.UUID;

import com.e_commerce.profileService.model.enums.AddressType;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class AddressDTO {
    
    @Nullable
    private UUID addressId;

    @NotBlank
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String fullName;

    @NotBlank
    @Size(max = 15, message = "Phone Number must be at most 15 characters")
    private String phoneNumber;

    @NotBlank
    @Size(max = 255, message = "AddressLine1 must be at most 255 characters")
    private String addressLine1;

    @Nullable
    @Size(max = 255, message = "AddressLine2 must be at most 255 characters")
    private String addressLine2;

    @Nullable
    @Size(max = 150, message = "Landmark must be at most 150 characters")
    private String landmark;

    @NotBlank
    @Size(max = 100, message = "City must be at most 100 characters")
    private String city;

    @NotBlank
    @Size(max = 100, message = "State must be at most 100 characters")
    private String state;

    @NotBlank
    @Size(max = 10, message = "PostalCode must be at most 10 characters")
    private String postalCode;

    @NotBlank
    @Size(max = 100, message = "Country must be at most 100 characters")
    private String country;

    @NotNull
    private AddressType addressType;

    @NotNull
    private Boolean isDefault;
}
