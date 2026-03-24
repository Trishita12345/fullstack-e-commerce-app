package com.e_commerce.profileService.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.model.dto.BetterAuthUser;
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
    public void saveUserDetails(String userId, BetterAuthUser user) {
        Optional<UserInfo> userInfo = userInfoRepository.getByUserId(userId);
        if (userInfo.isPresent()) {
            return;
        }
        UserInfo newUserInfo = UserInfo.builder()
                .userId(user.getId())
                .fullname(user.getName())
                .emailId(user.getEmail())
                .emailIdVerified(user.isEmailVerified())
                .profileImg(user.getImage())
                .build();

        userInfoRepository.save(newUserInfo);
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
