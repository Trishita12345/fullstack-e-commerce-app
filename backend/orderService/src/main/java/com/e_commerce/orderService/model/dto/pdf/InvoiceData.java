package com.e_commerce.orderService.model.dto.pdf;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceData {
    @Builder.Default
    private String companyName = "LOOM and LUME";
    @Builder.Default
    private String companyEmail = "support@loomandlume.com";
    @Builder.Default
    private String sellerName = "LOOM and LUME";
    @Builder.Default
    private String sellerAddress = "123, Main Street, City, State, ZIP";
    @Builder.Default
    private String panNo = "PAN1234567A";
    @Builder.Default
    private String gstNo = "GSTIN1234567A1Z5";
    private String orderId;
    private String orderDate;
    private String invoiceNumber;
    private String invoiceDate;

    private String billingName;
    private String billingAddress;

    private String shippingName;
    private String shippingAddress;

    private List<InvoiceItemData> items;
    private double subtotal;
    private double discount;
    private double totalAmount;
    private String amountInWords;
}
