package com.e_commerce.seachEngineService.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.seachEngineService.model.CartItemDocument;
import com.e_commerce.seachEngineService.model.OrderSearchDocument;
import com.e_commerce.seachEngineService.model.ProductSearchDocument;
import com.e_commerce.seachEngineService.repository.IOrderSearchRepository;
import com.e_commerce.seachEngineService.repository.IProductSearchRepository;
import com.e_commerce.seachEngineService.service.IOrderSearchService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderSearchService implements IOrderSearchService {

    private final IProductSearchRepository productSearchRepository;
    private final IOrderSearchRepository orderSearchRepository;

    @Override
    @Transactional
    public void updateProductAndOrderIndexForConfirmedOrder(OrderFulfilledEvent event) {
        List<CartItemDocument> cartItemDocumentList = new ArrayList<>();
        List<UUID> productIds = event.getItems()
                .stream()
                .map(CartItemDTO::getProductItemId)
                .toList();

        List<ProductSearchDocument> products = new ArrayList<>();
        productSearchRepository.findAllById(productIds).forEach(products::add);

        Map<UUID, ProductSearchDocument> productMap = products
                .stream()
                .collect(Collectors.toMap(
                        ProductSearchDocument::getProductItemId,
                        Function.identity()));

        event.getItems().forEach(item -> {
            ProductSearchDocument product = productMap.get(item.getProductItemId());
            if (product == null) {
                throw new RuntimeException("Product item not indexed: " + item.getProductItemId());
            }
            // ✅ updated purchase count
            int purchaseCount = product.getPurchaseCount() + item.getQuantity();

            long lastPurchaseTime = product.getLastUpdatedAt();
            long now = System.currentTimeMillis();

            long hoursSinceLastPurchase = lastPurchaseTime == 0
                    ? 0
                    : (now - lastPurchaseTime) / (1000 * 60 * 60);

            // ✅ use double for proper division
            double freshnessBoost = 10.0 / (hoursSinceLastPurchase + 1.0);

            double timeDecay = hoursSinceLastPurchase * 0.1;

            // ✅ use Math.log
            double score = Math.log(purchaseCount + 1) + freshnessBoost - timeDecay;

            product.setPurchaseCount(purchaseCount);
            product.setTrendingScore(Math.max(score, 0));
            product.setLastUpdatedAt(now);
            CartItemDocument cartItemDocument = CartItemDocument.builder()
                    .productItemId(item.getProductItemId())
                    .quantity(item.getQuantity())
                    .build();
            cartItemDocumentList.add(cartItemDocument);
        });

        productSearchRepository.saveAll(productMap.values());

        OrderSearchDocument orderSearchDocument = OrderSearchDocument.builder()
                .orderId(event.getOrderId())
                .orderStatus(event.getOrderStatus())
                .userId(event.getUserId())
                .items(cartItemDocumentList)
                .build();
        orderSearchRepository.save(orderSearchDocument);
    }

}
