package com.e_commerce.orderService.service.impl;

import com.e_commerce.common.pdf.model.PdfContent;
import com.e_commerce.common.pdf.model.PdfTemplate;
import com.e_commerce.common.pdf.service.IPdfGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class OrderPdfService {

    private final IPdfGeneratorService pdfGeneratorService;

    public byte[] generateOrderInvoice(UUID orderId, String orderDetails) {
        PdfContent content = PdfContent.builder()
                .title("Order Invoice")
                .content(orderDetails)
                .documentType("INVOICE")
                .generatedAt(LocalDateTime.now())
                .footerText("Thank you for your purchase!")
                .build();

        PdfTemplate template = PdfTemplate.builder()
                .headerText("Invoice")
                .companyName("Loom & Lume")
                .pageSize("A4")
                .topMargin(40)
                .bottomMargin(40)
                .leftMargin(40)
                .rightMargin(40)
                .build();

        return pdfGeneratorService.generatePdf(content, template);
    }
}
