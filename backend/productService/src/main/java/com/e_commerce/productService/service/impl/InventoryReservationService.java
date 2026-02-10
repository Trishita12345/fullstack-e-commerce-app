package com.e_commerce.productService.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.productService.model.InventoryReservation;
import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.enums.ReservationStatus;
import com.e_commerce.productService.repository.IInventoryReservationRepository;
import com.e_commerce.productService.repository.IProductItemRepository;
import com.e_commerce.productService.service.IInventoryReservationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryReservationService implements IInventoryReservationService {

    private final IProductItemRepository productItemRepository;
    private final IInventoryReservationRepository reservationRepository;

    @Transactional
    @Override
    public boolean reserveInventory(UUID orderId, UUID productItemId, int qty) {

        int sellableStock = getSellableStock(productItemId);

        // 3️⃣ check availability
        if (sellableStock < qty) {
            return false;
        }

        // 4️⃣ create reservation
        InventoryReservation reservation = InventoryReservation.builder()
                .orderId(orderId)
                .productItemId(productItemId)
                .quantity(qty)
                .status(ReservationStatus.RESERVED)
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .build();

        reservationRepository.save(reservation);

        return true;
    }

    @Override
    @Transactional
    public int getSellableStock(UUID productItemId) {
        // 1️⃣ LOCK product row
        ProductItem productItem = productItemRepository
                .findByIdForUpdate(productItemId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        int totalStock = productItem.getAvailableStock();

        // 2️⃣ calculate already reserved
        int reserved = reservationRepository.sumReservedQuantity(
                productItemId,
                ReservationStatus.RESERVED);

        int sellableStock = totalStock - reserved;
        return sellableStock;
    }

}
