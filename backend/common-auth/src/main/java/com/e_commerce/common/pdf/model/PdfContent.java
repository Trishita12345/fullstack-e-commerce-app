package com.e_commerce.common.pdf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PdfContent {
    private String title;
    private String content;
    private String footerText;
    private LocalDateTime generatedAt;
    private String documentType; // e.g., "INVOICE", "RECEIPT", "REPORT"
}
