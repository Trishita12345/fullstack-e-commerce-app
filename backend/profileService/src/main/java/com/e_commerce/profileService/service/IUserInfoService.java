package com.e_commerce.profileService.service;

import com.e_commerce.profileService.model.UserInfo;

public interface IUserInfoService {

    UserInfo getUserDetailsByUserId(String userId);

    void saveUserDetails(String userId, String phoneNumber);

    UserInfo updateUserDetailsByUserId(String userId, UserInfo userInfo);
}
