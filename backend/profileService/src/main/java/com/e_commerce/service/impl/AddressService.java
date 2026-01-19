package com.e_commerce.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.transaction.annotation.Transactional;

import com.e_commerce.profileService.model.Address;
import com.e_commerce.profileService.model.dto.AddressDTO;
import com.e_commerce.profileService.repository.IAddressRepository;
import com.e_commerce.service.IAddressService;
import com.jetbrains.exported.JBRApi.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AddressService implements IAddressService {

    private final IAddressRepository addressRepository;

    @Override
    @Transactional
    public AddressDTO addAddress(AddressDTO addressDTO) {
        
        return null;
    }

    @Override
    @Transactional
    public AddressDTO updateAddress(AddressDTO addressDTO) {
        return null;
    }

    @Override
    @Transactional
    public void deleteAddress(UUID addressId) {
        Address address = getAddressByIdInternal(addressId);
        addressRepository.delete(address);
    }

    @Override
    public List<AddressDTO> getAllAddresses() {
        return addressRepository.findAll().stream().map(i -> addressEntityToDTOMapper(i)).toList();
    }

    @Override
    public AddressDTO getAddressbyId(UUID addressId) {
        return addressEntityToDTOMapper(getAddressByIdInternal(addressId));
    }
    
    private Address getAddressByIdInternal(UUID addressId) {
    return addressRepository.findById(addressId)
            .orElseThrow(() -> new EntityNotFoundException("Address not found: " + addressId));
    }

    
    private AddressDTO addressEntityToDTOMapper(Address address) {
        return AddressDTO.builder()
                .addressId(address.getAddressId())
                .fullName(address.getFullName())
                .phoneNumber(address.getPhoneNumber())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .landmark(address.getLandmark())
                .city(address.getCity())
                .state(address.getState())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .addressType(address.getAddressType())
                .isDefault(address.isDefault())
        .build();
    }

    
} 