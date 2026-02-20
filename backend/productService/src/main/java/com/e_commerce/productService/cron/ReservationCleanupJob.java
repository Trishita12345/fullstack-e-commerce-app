package com.e_commerce.productService.cron;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.e_commerce.productService.repository.IInventoryReservationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReservationCleanupJob {

    private final IInventoryReservationRepository inventoryReservationRepository;

    @Scheduled(fixedRate = 300000) // every 5 minutes
    @Transactional
    public void expireReservations() {
        int count = inventoryReservationRepository.expireReservations();
        System.out.println("Expired reservations: " + count);
    }
}
