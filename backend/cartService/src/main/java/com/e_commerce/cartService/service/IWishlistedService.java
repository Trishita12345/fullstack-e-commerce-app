package com.e_commerce.cartService.service;

import java.util.List;
import java.util.UUID;

public interface IWishlistedService {

    List<UUID> getWishlistedItems(String userId);

    void addtoWishlist(String name, UUID productItemId);

    void removeFromWishlist(String name, UUID productItemId);

}
