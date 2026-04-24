package com.e_commerce.profileService.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e_commerce.profileService.model.UserInfo;

@Repository
public interface IUserInfoRepository extends JpaRepository<UserInfo, UUID> {

    @Query(value = "Select * from user_info where user_id = :userId", nativeQuery = true)
    Optional<UserInfo> getByUserId(String userId);
}