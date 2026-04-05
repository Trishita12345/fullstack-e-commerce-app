package com.e_commerce.profileService.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.UserInfoDTO;
import com.e_commerce.common.model.enums.Gender;
import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.repository.IUserInfoRepository;
import com.e_commerce.profileService.service.IUserInfoService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserInfoService implements IUserInfoService {

    private final IUserInfoRepository userInfoRepository;

    @Override
    public UserInfo getUserDetailsByUserId(String userId) {
        return userInfoRepository.getByUserId(userId).orElseThrow();
    }

    @Override
    @Transactional
    public UserInfoDTO saveUserDetails(String userId, String phoneNumber) {
        Optional<UserInfo> userInfo = userInfoRepository.getByUserId(userId);
        if (userInfo.isPresent()) {
            return userToUserInfoMapper(userInfo.get());
        }
        UserInfo newUserInfo = UserInfo.builder()
                .userId(userId)
                .fullName("")
                .phoneNumber(phoneNumber)
                .gender(Gender.MALE)
                .build();

        UserInfo savedUserInfo = userInfoRepository.save(newUserInfo);
        return userToUserInfoMapper(savedUserInfo);
    }

    private UserInfoDTO userToUserInfoMapper(UserInfo existUserInfo) {
        return UserInfoDTO.builder()
                .id(existUserInfo.getId())
                .userId(existUserInfo.getUserId())
                .createdAt(existUserInfo.getCreatedAt())
                .updatedAt(existUserInfo.getUpdatedAt())
                .fullName(existUserInfo.getFullName())
                .phoneNumber(existUserInfo.getPhoneNumber())
                .emailId(existUserInfo.getEmailId())
                .dob(existUserInfo.getDob())
                .gender(existUserInfo.getGender())
                .build();
    }

    @Override
    @Transactional
    public UserInfo updateUserDetailsByUserId(String userId, UserInfo userInfo) {
        UserInfo existingUserInfo = userInfoRepository.getByUserId(userId).orElseThrow();
        return userInfoRepository.save(
                userInfo.toBuilder()
                        .id(existingUserInfo.getId())
                        .build());

    }

}
