package com.e_commerce.common.pdf.service.impl;

import com.e_commerce.common.pdf.model.PdfContent;
import com.e_commerce.common.pdf.model.PdfTemplate;
import com.e_commerce.common.pdf.service.IPdfGeneratorService;
import com.e_commerce.common.pdf.exception.PdfGenerationException;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.HorizontalAlignment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class PdfGeneratorService implements IPdfGeneratorService {

    private static final PdfTemplate DEFAULT_TEMPLATE = PdfTemplate.builder()
            .headerText("Document")
            .companyName("Loom & Lume")
            .pageSize("A4")
            .topMargin(40)
            .bottomMargin(40)
            .leftMargin(40)
            .rightMargin(40)
            .build();

    @Override
    public byte[] generatePdf(PdfContent content, PdfTemplate template) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            // Set margins
            document.setMargins(
                    template.getTopMargin(),
                    template.getRightMargin(),
                    template.getBottomMargin(),
                    template.getLeftMargin());

            // Add header
            if (template.getHeaderText() != null) {
                Paragraph header = new Paragraph(template.getHeaderText())
                        .setHorizontalAlignment(HorizontalAlignment.CENTER)
                        .setFontSize(18)
                        .setBold();
                document.add(header);
            }

            // Add company name
            if (template.getCompanyName() != null) {
                Paragraph companyName = new Paragraph(template.getCompanyName())
                        .setHorizontalAlignment(HorizontalAlignment.CENTER)
                        .setFontSize(12)
                        .setMarginBottom(20);
                document.add(companyName);
            }

            // Add title
            if (content.getTitle() != null) {
                Paragraph title = new Paragraph(content.getTitle())
                        .setFontSize(16)
                        .setBold()
                        .setMarginBottom(15);
                document.add(title);
            }

            // Add content
            if (content.getContent() != null) {
                Paragraph contentParagraph = new Paragraph(content.getContent())
                        .setFontSize(11)
                        .setMarginBottom(15);
                document.add(contentParagraph);
            }

            // Add generated timestamp
            if (content.getGeneratedAt() != null) {
                String formattedDate = content.getGeneratedAt()
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                Paragraph timestamp = new Paragraph("Generated: " + formattedDate)
                        .setFontSize(9)
                        .setItalic()
                        .setMarginTop(20);
                document.add(timestamp);
            }

            // Add footer
            if (content.getFooterText() != null) {
                Paragraph footer = new Paragraph(content.getFooterText())
                        .setHorizontalAlignment(HorizontalAlignment.CENTER)
                        .setFontSize(9)
                        .setMarginTop(30);
                document.add(footer);
            }

            document.close();
            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new PdfGenerationException("Failed to generate PDF: " + e.getMessage(), e);
        }
    }

    @Override
    public byte[] generatePdfWithDefaults(PdfContent content) {
        return generatePdf(content, DEFAULT_TEMPLATE);
    }
}
