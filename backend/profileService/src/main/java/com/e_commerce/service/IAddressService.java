package com.e_commerce.service;

import java.util.List;
import java.util.UUID;

import com.e_commerce.profileService.model.dto.AddressDTO;

public interface IAddressService {

    public AddressDTO addAddress(AddressDTO addressDTO);
    public AddressDTO updateAddress(AddressDTO addressDTO);
    public void deleteAddress(UUID addressId);
    public List<AddressDTO> getAllAddresses();
    public AddressDTO getAddressbyId(UUID addressId);
}
