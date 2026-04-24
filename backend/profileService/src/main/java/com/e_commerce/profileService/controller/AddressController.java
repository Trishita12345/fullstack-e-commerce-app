package com.e_commerce.profileService.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.AddressDTO;
import com.e_commerce.profileService.service.IAddressService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/address")
@AllArgsConstructor
public class AddressController {

    private final IAddressService addressService;

    @PostMapping("/add")
    public ResponseEntity<AddressDTO> addAddress(@Valid @RequestBody AddressDTO addressDTO,
            Authentication authentication) {
        return ResponseEntity.ok(addressService.addAddress(addressDTO, authentication.getName()));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable UUID addressId,
            @Valid @RequestBody AddressDTO addressDTO, Authentication authentication) {
        return ResponseEntity.ok(addressService.updateAddress(addressDTO, authentication.getName()));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable UUID addressId, Authentication authentication) {
        addressService.deleteAddress(addressId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<AddressDTO>> getAllAddresses(Authentication authentication) {
        return ResponseEntity.ok(addressService.getAllAddresses(authentication.getName()));
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressDTO> getAddressbyId(@PathVariable UUID addressId, Authentication authentication) {
        return ResponseEntity.ok(addressService.getAddressbyId(addressId, authentication.getName()));
    }

}
