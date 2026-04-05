package com.e_commerce.productService.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.e_commerce.common.exception.BaseException;
import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.common.model.event.OrderFulfilledEvent;
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
                .orElseThrow(() -> new BaseException("Product not found", HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND"));

        int totalStock = productItem.getAvailableStock();

        // 2️⃣ calculate already reserved
        int reserved = reservationRepository.sumReservedQuantity(
                productItemId,
                ReservationStatus.RESERVED);

        int sellableStock = totalStock - reserved;
        return sellableStock;
    }

    @Override
    @Transactional
    public InventoryReserveEvent reserveInventoryForOrder(OrderCreatedEvent event) {
        boolean success = true;
        String message = "Inventory reserved successfully";

        for (CartItemDTO item : event.getItems()) {
            boolean reserved = reserveInventory(event.getOrderId(), item.getProductItemId(), item.getQuantity());
            if (!reserved) {
                success = false;
                message = "Failed to reserve inventory for product item: " + item.getProductItemId();
                break;
            }
        }

        InventoryReserveEvent reservationEvent = InventoryReserveEvent.builder()
                .orderId(event.getOrderId())
                .success(success)
                .message(message)
                .build();
        return reservationEvent;
    }

    @Override
    @Transactional
    public void updateInventoryForConfirmedOrder(OrderFulfilledEvent event) {
        UUID orderId = event.getOrderId();
        List<InventoryReservation> reservations = reservationRepository.findAllByOrderId(orderId);
        reservations.forEach(reservation -> {
            if (reservation.getStatus() != ReservationStatus.RESERVED) {
                return; // Skip if not in RESERVED status
            }
            reservation.setStatus(ReservationStatus.CONFIRMED);
            productItemRepository.decreaseAvailableStock(reservation.getProductItemId(), reservation.getQuantity());
            reservationRepository.save(reservation);
        });

    }

    @Override
    @Transactional
    public void updateInventoryForFailedOrder(OrderFulfilledEvent event) {
        UUID orderId = event.getOrderId();
        List<InventoryReservation> reservations = reservationRepository.findAllByOrderId(orderId);
        reservations.forEach(reservation -> {
            if (reservation.getStatus() != ReservationStatus.RESERVED) {
                return; // Skip if not in RESERVED status
            }
            reservation.setStatus(ReservationStatus.RELEASED);
            reservationRepository.save(reservation);
        });
    }

}
