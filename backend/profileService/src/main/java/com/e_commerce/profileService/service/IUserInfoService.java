package com.e_commerce.profileService.service;

import com.e_commerce.common.model.dto.UserInfoDTO;
import com.e_commerce.profileService.model.UserInfo;

public interface IUserInfoService {

    UserInfo getUserDetailsByUserId(String userId);

    UserInfoDTO saveUserDetails(String userId, String phoneNumber);

    UserInfo updateUserDetailsByUserId(String userId, UserInfo userInfo);
}
