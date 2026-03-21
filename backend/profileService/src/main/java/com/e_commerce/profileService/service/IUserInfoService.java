package com.e_commerce.profileService.service;

import com.e_commerce.profileService.model.UserInfo;
import com.e_commerce.profileService.model.dto.BetterAuthUser;

public interface IUserInfoService {

    UserInfo getUserDetailsByUserId(String userId);

    void saveUserDetails(String userId, BetterAuthUser user);

    UserInfo updateUserDetailsByUserId(String userId, UserInfo userInfo);
}
