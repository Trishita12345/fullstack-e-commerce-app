package com.e_commerce.authService.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.authService.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByPhoneNo(String phoneNo);
}