package com.e_commerce.profileService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.profileService.model.Address;
import java.util.List;
import java.util.Optional;


public interface IAddressRepository extends JpaRepository<Address, UUID>{
    List<Address> findByUserId(String userId);

    Optional<Address> findByAddressIdAndUserId(UUID addressId, String userId);

}
