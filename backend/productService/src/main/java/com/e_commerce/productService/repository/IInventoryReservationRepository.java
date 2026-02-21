package com.e_commerce.productService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.productService.model.InventoryReservation;
import com.e_commerce.productService.model.enums.ReservationStatus;

public interface IInventoryReservationRepository extends JpaRepository<InventoryReservation, UUID> {

    @Query("""
                SELECT COALESCE(SUM(ir.quantity), 0)
                FROM InventoryReservation ir
                WHERE ir.productItemId = :productItemId
                AND ir.status = :status
                AND ir.expiresAt > CURRENT_TIMESTAMP
            """)
    Integer sumReservedQuantity(UUID productItemId, ReservationStatus status);

    @Modifying
    @Query(value = """
            UPDATE inventory_reservation
            SET status = 'EXPIRED'
            WHERE status = 'RESERVED'
            AND expires_at < CURRENT_TIMESTAMP
            """, nativeQuery = true)
    int expireReservations();

    List<InventoryReservation> findAllByOrderId(UUID orderId);

}
