package com.e_commerce.orderService.model.dto.pdf;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceItemData {
    private String description;
    private double unitPrice;
    private int quantity;
    private double netAmount;
    private double cgstRate;
    private double cgstAmount;
    private double sgstRate;
    private double sgstAmount;
    private double totalTaxAmount;
    private double totalAmount;
}
