package com.e_commerce.profileService.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e_commerce.profileService.model.Address;
import com.e_commerce.profileService.model.dto.AddressDTO;
import com.e_commerce.profileService.repository.IAddressRepository;
import com.e_commerce.profileService.service.IAddressService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AddressService implements IAddressService {

    private final IAddressRepository addressRepository;

    @Override
    @Transactional
    public AddressDTO addAddress(AddressDTO addressDTO, String userId) {
        Address address = Address.builder()
                .userId(userId)
                .fullName(addressDTO.getFullName())
                .phoneNumber(addressDTO.getPhoneNumber())
                .addressLine1(addressDTO.getAddressLine1())
                .addressLine2(addressDTO.getAddressLine2())
                .landmark(addressDTO.getLandmark())
                .city(addressDTO.getCity())
                .state(addressDTO.getState())
                .postalCode(addressDTO.getPostalCode())
                .country(addressDTO.getCountry())
                .addressType(addressDTO.getAddressType())
                .isDefault(addressDTO.isDefault())
        .build();
        Address savedAddress = addressRepository.save(address);
        return addressEntityToDTOMapper(savedAddress);
    }

    @Override
    @Transactional
    public AddressDTO updateAddress(AddressDTO addressDTO, String userId) {
        Address address = getAddressByIdInternal(addressDTO.getAddressId(), userId);
        address.setFullName(addressDTO.getFullName());
        address.setPhoneNumber(addressDTO.getPhoneNumber());
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setLandmark(addressDTO.getLandmark());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCountry(addressDTO.getCountry());
        address.setAddressType(addressDTO.getAddressType());
        address.setDefault(addressDTO.isDefault());
        Address savedAddress = addressRepository.save(address);
        return addressEntityToDTOMapper(savedAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(UUID addressId, String userId) {
        Address address = getAddressByIdInternal(addressId, userId);
        addressRepository.delete(address);
    }

    @Override
    public List<AddressDTO> getAllAddresses(String userId) {
        return addressRepository.findByUserId(userId).stream().map(i -> addressEntityToDTOMapper(i)).toList();
    }

    @Override
    public AddressDTO getAddressbyId(UUID addressId, String userId) {
        return addressEntityToDTOMapper(getAddressByIdInternal(addressId, userId));
    }
    
    private Address getAddressByIdInternal(UUID addressId, String userId) {
    return addressRepository.findByAddressIdAndUserId(addressId, userId)
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