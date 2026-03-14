package com.e_commerce.profileService.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.AddressDTO;
import com.e_commerce.profileService.service.IAddressService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/internal/address")
@AllArgsConstructor
public class InternalController {

    private final IAddressService addressService;

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressDTO> getAddressbyId(@PathVariable UUID addressId) {
        return ResponseEntity.ok(addressService.getAddressbyId(addressId));
    }
}
