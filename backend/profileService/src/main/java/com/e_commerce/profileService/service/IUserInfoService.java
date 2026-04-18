package com.e_commerce.profileService.service;

import com.e_commerce.common.model.dto.UserInfoDTO;

public interface IUserInfoService {

    UserInfoDTO getUserDetailsByUserId(String userId);

    UserInfoDTO saveUserDetails(String userId, String phoneNumber);

    UserInfoDTO updateUserDetailsByUserId(String userId, UserInfoDTO userInfoDto);

    UserInfoDTO getUserInfo(String name);
}
