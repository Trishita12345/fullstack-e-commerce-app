package com.e_commerce.common.pdf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PdfTemplate {
    private String headerText;
    private String logoUrl;
    private String companyName;
    private String pageSize; // "A4", "LETTER"
    private float topMargin;
    private float bottomMargin;
    private float leftMargin;
    private float rightMargin;
}
