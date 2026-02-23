package com.e_commerce.common.pdf.service;

import com.e_commerce.common.pdf.model.PdfContent;
import com.e_commerce.common.pdf.model.PdfTemplate;

public interface IPdfGeneratorService {
    /**
     * Generate PDF from content and template
     * 
     * @param content  PDF content (title, body, footer)
     * @param template PDF layout template (margins, fonts, etc.)
     * @return PDF as byte array
     * @throws PdfGenerationException if generation fails
     */
    byte[] generatePdf(PdfContent content, PdfTemplate template);

    /**
     * Generate PDF with default template
     * 
     * @param content PDF content
     * @return PDF as byte array
     */
    byte[] generatePdfWithDefaults(PdfContent content);
}
