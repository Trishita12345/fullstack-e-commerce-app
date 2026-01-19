package com.e_commerce.profileService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.profileService.model.Address;

public interface IAddressRepository extends JpaRepository<Address, UUID>{
    
}
