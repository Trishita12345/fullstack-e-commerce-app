package com.e_commerce.orderService.client;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.e_commerce.common.model.dto.AddressDTO;

@FeignClient(name = "profile-service", url = "${feign.client.profile-service.url}")
public interface IProfileClient {

    @GetMapping(path = "/internal/address/{addressId}")
    AddressDTO getAddressDetailsById(@PathVariable UUID addressId);
}
