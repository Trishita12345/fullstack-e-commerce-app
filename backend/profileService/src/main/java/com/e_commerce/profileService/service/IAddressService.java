package com.e_commerce.profileService.service;

import java.util.List;
import java.util.UUID;

import com.e_commerce.profileService.model.dto.AddressDTO;

public interface IAddressService {

    AddressDTO addAddress(AddressDTO addressDTO, String userId);
    AddressDTO updateAddress(AddressDTO addressDTO, String userId);
    void deleteAddress(UUID addressId, String userId);
    List<AddressDTO> getAllAddresses(String userId);
    AddressDTO getAddressbyId(UUID addressId, String userId);
}
