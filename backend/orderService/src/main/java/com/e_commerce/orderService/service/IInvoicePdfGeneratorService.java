package com.e_commerce.orderService.service;

import com.e_commerce.orderService.model.dto.pdf.InvoiceData;

public interface IInvoicePdfGeneratorService {
    byte[] generateInvoicePdf(InvoiceData invoiceData);
}
