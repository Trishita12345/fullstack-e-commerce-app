package com.e_commerce.orderService.service.impl;

import com.e_commerce.orderService.model.dto.pdf.InvoiceData;
import com.e_commerce.orderService.model.dto.pdf.InvoiceItemData;
import com.e_commerce.orderService.service.IInvoicePdfGeneratorService;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

/**
 * Service to generate invoice PDFs with proper formatting
 */
@Service
public class InvoicePdfGeneratorService implements IInvoicePdfGeneratorService {

    // Currency and formatting constants
    private static final String CURRENCY_FORMAT = "%.2f";
    private static final String PERCENTAGE_FORMAT = "%.0f%%";

    // Font size constants
    private static final float FONT_SIZE_HEADER = 20f;
    private static final float FONT_SIZE_SECTION_TITLE = 12f;
    private static final float FONT_SIZE_SMALL = 9f;
    private static final float FONT_SIZE_TINY = 7f;

    // Layout constants
    private static final float CELL_PADDING = 8f;
    private static final float CELL_PADDING_SMALL = 5f;
    private static final float CELL_PADDING_TINY = 6f;
    private static final float MARGIN = 20f;

    // Table column configuration
    private static final float[] ITEMS_TABLE_COLUMNS = { 0.8f, 3f, 1.2f, 0.8f, 1.2f, 1f, 1.2f, 1f, 1.2f, 1.4f };
    private static final int SUMMARY_TABLE_COLUMNS = 2;
    private static final int HEADER_TABLE_COLUMNS = 2;
    private static final int DETAILS_TABLE_COLUMNS = 2;

    // Header texts
    private static final String HEADER_INVOICE_TITLE = "Tax Invoice/Bill of Supply";
    private static final String HEADER_INVOICE_SUBTITLE = "(Original for Recipient)";
    private static final String HEADER_SOLD_BY = "Sold By:";
    private static final String HEADER_BILLING = "Billing Address:";
    private static final String HEADER_SHIPPING = "Shipping Address:";

    // Section titles
    private static final String SECTION_PRICE_SUMMARY = "PRICE SUMMARY";
    private static final String SECTION_AMOUNT_WORDS = "Amount in Words:";

    // Table headers
    private static final String[] TABLE_HEADERS = { "S.No", "Description", "Qty", "Unit Price (Rs.)",
            "CGST %",
            "CGST (Rs.)", "SGST %", "SGST (Rs.)", "Net Amount (Rs.)", "Total (Rs.)" };

    // Summary labels
    private static final String LABEL_SUBTOTAL = "Subtotal (Rs.)";
    private static final String LABEL_CGST = "CGST (Rs.)";
    private static final String LABEL_SGST = "SGST (Rs.)";
    private static final String LABEL_TOTAL = "TOTAL (Rs.)";

    // Footer texts
    private static final String FOOTER_FOR = "For %s:";
    private static final String FOOTER_SIGNATORY = "Authorized Signatory";
    private static final String FOOTER_REVERSE_CHARGE = "Whether tax is payable under reverse charge - No";

    // Field labels
    private static final String FIELD_PAN = "PAN No: ";
    private static final String FIELD_GST = "GST: ";
    private static final String FIELD_ORDER = "Order #: ";
    private static final String FIELD_DATE = "Date: ";

    // Format symbols
    private static final String NEWLINE = "\n";

    private static final String[] ONES = { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" };
    private static final String[] TEENS = { "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen" };
    private static final String[] TENS = { "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
            "Ninety" };
    private static final String[] SCALES = { "", "Thousand", "Lakh", "Crore" };

    @Override
    public byte[] generateInvoicePdf(InvoiceData invoiceData) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            // Initialize PDF document
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);
            document.setMargins(MARGIN, MARGIN, MARGIN, MARGIN);

            // Build invoice sections
            addCompanyHeader(document, invoiceData);
            addSpacing(document);

            addOrderAndBillingDetails(document, invoiceData);
            addSpacing(document);

            TaxTotals taxTotals = addItemsTable(document, invoiceData);
            addSpacing(document);

            addPriceSummary(document, invoiceData, taxTotals);
            addSpacing(document);

            addAmountInWords(document, invoiceData);
            addSpacing(document);

            addFooter(document, invoiceData);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }

        return baos.toByteArray();
    }

    /**
     * Add company header with title and logo area
     */
    private void addCompanyHeader(Document document, InvoiceData data) {
        Table headerTable = new Table(HEADER_TABLE_COLUMNS);
        headerTable.setWidth(UnitValue.createPercentValue(100));

        // Company Info (Left)
        Cell leftCell = new Cell();
        leftCell.add(new Paragraph(data.getCompanyName()).setFontSize(FONT_SIZE_HEADER).setBold());
        leftCell.add(new Paragraph(data.getCompanyEmail()).setFontSize(FONT_SIZE_SMALL));
        leftCell.setBorder(null);

        // Invoice Title (Right)
        Cell rightCell = new Cell();
        rightCell.add(new Paragraph(HEADER_INVOICE_TITLE).setFontSize(FONT_SIZE_SECTION_TITLE).setBold());
        rightCell.add(new Paragraph(HEADER_INVOICE_SUBTITLE).setFontSize(FONT_SIZE_SMALL));
        rightCell.setTextAlignment(TextAlignment.RIGHT);
        rightCell.setBorder(null);

        headerTable.addCell(leftCell);
        headerTable.addCell(rightCell);
        document.add(headerTable);
    }

    /**
     * Add seller, billing and shipping details
     */
    private void addOrderAndBillingDetails(Document document, InvoiceData data) {
        Table mainTable = new Table(DETAILS_TABLE_COLUMNS);
        mainTable.setWidth(UnitValue.createPercentValue(100));

        // Left: Seller & Order Info
        Cell leftCell = createDetailsCell(
                HEADER_SOLD_BY, data.getSellerName() + NEWLINE + data.getSellerAddress(),
                NEWLINE + FIELD_PAN + data.getPanNo() + NEWLINE + FIELD_GST + data.getGstNo(),
                NEWLINE + FIELD_ORDER + data.getOrderId() + NEWLINE + FIELD_DATE + data.getOrderDate());

        // Right: Billing & Shipping Address
        Cell rightCell = createDetailsCell(
                HEADER_BILLING,
                data.getBillingName() + NEWLINE + data.getBillingAddress() +
                        NEWLINE + NEWLINE + HEADER_SHIPPING,
                data.getShippingName() + NEWLINE + data.getShippingAddress());

        mainTable.addCell(leftCell);
        mainTable.addCell(rightCell);
        document.add(mainTable);
    }

    /**
     * Create formatted details cell
     */
    private Cell createDetailsCell(String... content) {
        Cell cell = new Cell();
        for (String text : content) {
            cell.add(new Paragraph(text).setFontSize(FONT_SIZE_SMALL));
        }
        cell.setBorder(null);
        cell.setPadding(CELL_PADDING);
        return cell;
    }

    /**
     * Add items table with CGST/SGST breakdown
     * 
     * @return TaxTotals containing total CGST and SGST
     */
    private TaxTotals addItemsTable(Document document, InvoiceData data) {
        Table itemsTable = new Table(ITEMS_TABLE_COLUMNS);
        itemsTable.setWidth(UnitValue.createPercentValue(100));

        // Add table headers
        for (String header : TABLE_HEADERS) {
            itemsTable.addHeaderCell(createHeaderCell(header));
        }

        // Populate items and calculate totals
        int serialNo = 1;
        double totalCgst = 0;
        double totalSgst = 0;
        double totalPriceExcludingGST = 0;

        for (InvoiceItemData item : data.getItems()) {
            itemsTable.addCell(createDataCell(String.valueOf(serialNo++), TextAlignment.CENTER));
            itemsTable.addCell(createDataCell(item.getDescription(), TextAlignment.LEFT));
            itemsTable.addCell(createDataCell(String.valueOf(item.getQuantity()), TextAlignment.CENTER));
            itemsTable.addCell(createDataCell(format(item.getUnitPrice()), TextAlignment.CENTER));
            itemsTable.addCell(
                    createDataCell(String.format(PERCENTAGE_FORMAT, item.getCgstRate()), TextAlignment.CENTER));
            itemsTable.addCell(createDataCell(format(item.getCgstAmount()), TextAlignment.CENTER));
            itemsTable.addCell(
                    createDataCell(String.format(PERCENTAGE_FORMAT, item.getSgstRate()), TextAlignment.CENTER));
            itemsTable.addCell(createDataCell(format(item.getSgstAmount()), TextAlignment.CENTER));

            itemsTable.addCell(createDataCell(format(item.getNetAmount()), TextAlignment.CENTER));
            itemsTable.addCell(createDataCell(format(item.getTotalAmount()), TextAlignment.CENTER));

            totalCgst += item.getCgstAmount() * item.getQuantity();
            totalSgst += item.getSgstAmount() * item.getQuantity();
            totalPriceExcludingGST += item.getUnitPrice() * item.getQuantity();
        }

        // Add totals row
        addTableTotalsRow(itemsTable, totalCgst, totalSgst, data.getTotalAmount());

        document.add(itemsTable);
        return new TaxTotals(totalCgst, totalSgst, totalPriceExcludingGST);
    }

    /**
     * Add totals row to items table
     */
    private void addTableTotalsRow(Table table, double totalCgst, double totalSgst, double totalAmount) {
        Cell totalLabel = new Cell(1, 9);
        totalLabel.add(new Paragraph(LABEL_TOTAL).setBold());
        totalLabel.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        totalLabel.setTextAlignment(TextAlignment.CENTER);
        totalLabel.setPadding(CELL_PADDING_TINY);

        table.addCell(totalLabel);
        table.addCell(createTotalCell(format(totalAmount)));
    }

    /**
     * Add price summary section with CGST/SGST breakdown
     */
    private void addPriceSummary(Document document, InvoiceData data, TaxTotals taxTotals) {
        document.add(new Paragraph(SECTION_PRICE_SUMMARY).setFontSize(FONT_SIZE_SECTION_TITLE).setBold());

        Table summaryTable = new Table(SUMMARY_TABLE_COLUMNS);
        summaryTable.setWidth(UnitValue.createPercentValue(100));

        // Summary rows
        addSummaryRow(summaryTable, LABEL_SUBTOTAL, format(taxTotals.getTotalPriceExcludingGST()));

        addSummaryRow(summaryTable, LABEL_CGST, format(taxTotals.getTotalCgst()));
        addSummaryRow(summaryTable, LABEL_SGST, format(taxTotals.getTotalSgst()));

        // Total row
        Cell totalLabel = new Cell();
        totalLabel.add(new Paragraph(LABEL_TOTAL).setBold().setFontSize(FONT_SIZE_SMALL));
        totalLabel.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        totalLabel.setPadding(CELL_PADDING);

        Cell totalAmount = new Cell();
        totalAmount.add(new Paragraph(format(data.getTotalAmount())).setBold().setFontSize(FONT_SIZE_SMALL));
        totalAmount.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        totalAmount.setTextAlignment(TextAlignment.RIGHT);
        totalAmount.setPadding(CELL_PADDING);

        summaryTable.addCell(totalLabel);
        summaryTable.addCell(totalAmount);

        document.add(summaryTable);
    }

    /**
     * Add a row to summary table
     */
    private void addSummaryRow(Table table, String label, String value) {
        Cell labelCell = new Cell();
        labelCell.add(new Paragraph(label).setFontSize(FONT_SIZE_SMALL));
        labelCell.setPadding(CELL_PADDING);

        Cell valueCell = new Cell();
        valueCell.add(new Paragraph(value).setFontSize(FONT_SIZE_SMALL));
        valueCell.setTextAlignment(TextAlignment.RIGHT);
        valueCell.setPadding(CELL_PADDING);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    /**
     * Add amount in words section
     */
    private void addAmountInWords(Document document, InvoiceData data) {
        document.add(new Paragraph(SECTION_AMOUNT_WORDS).setBold().setFontSize(FONT_SIZE_SMALL));
        document.add(new Paragraph(data.getAmountInWords()).setFontSize(FONT_SIZE_SMALL));
    }

    /**
     * Add footer with signature area
     */
    private void addFooter(Document document, InvoiceData data) {
        document.add(new Paragraph(NEWLINE + String.format(FOOTER_FOR, data.getCompanyName())).setBold()
                .setFontSize(FONT_SIZE_SMALL));
        document.add(new Paragraph(NEWLINE + NEWLINE + NEWLINE + FOOTER_SIGNATORY).setFontSize(FONT_SIZE_SMALL));
        document.add(new Paragraph(NEWLINE + FOOTER_REVERSE_CHARGE).setFontSize(FONT_SIZE_SMALL));
    }

    /**
     * Helper: Format currency values
     */
    private String format(double value) {
        return String.format(CURRENCY_FORMAT, value);
    }

    /**
     * Helper: Add spacing between sections
     */
    private void addSpacing(Document document) {
        document.add(new Paragraph(NEWLINE));
    }

    /**
     * Helper: Create header cell
     */
    private Cell createHeaderCell(String content) {
        Cell cell = new Cell();
        cell.add(new Paragraph(content).setBold().setFontSize(FONT_SIZE_SMALL));
        cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        cell.setPadding(CELL_PADDING_TINY);
        cell.setTextAlignment(TextAlignment.CENTER);
        return cell;
    }

    /**
     * Helper: Create data cell
     */
    private Cell createDataCell(String content, TextAlignment alignment) {
        Cell cell = new Cell();
        cell.add(new Paragraph(content).setFontSize(FONT_SIZE_TINY));
        cell.setPadding(CELL_PADDING_SMALL);
        cell.setTextAlignment(alignment);
        return cell;
    }

    /**
     * Helper: Create total cell
     */
    private Cell createTotalCell(String content) {
        Cell cell = new Cell();
        cell.add(new Paragraph(content).setBold().setFontSize(FONT_SIZE_SMALL));
        cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
        cell.setTextAlignment(TextAlignment.CENTER);
        cell.setPadding(CELL_PADDING_TINY);
        return cell;
    }

    /**
     * Inner class to hold tax calculations
     */
    @Data
    @AllArgsConstructor
    private static class TaxTotals {
        private final double totalCgst;
        private final double totalSgst;
        private final double totalPriceExcludingGST;
    }

    /**
     * Convert numeric amount to words (Indian format)
     * Example: 1234567.89 -> "Twelve Lakh Thirty Four Thousand Five Hundred Sixty
     * Seven and Paise Eighty Nine only"
     * 
     * @param amount the amount to convert
     * @return the amount in words format
     */
    public static String convertAmountToWords(double amount) {
        if (amount == 0) {
            return "Zero only";
        }

        long rupees = (long) amount;
        long paise = Math.round((amount - rupees) * 100);

        StringBuilder result = new StringBuilder();

        // Convert rupees to words
        if (rupees > 0) {
            result.append(convertToWords(rupees)).append(" only");
        }

        // Add paise if present
        if (paise > 0) {
            if (rupees > 0) {
                result.append(" and Paise ").append(convertToWords(paise)).append(" only");
            } else {
                result.append("Paise ").append(convertToWords(paise)).append(" only");
            }
        }

        return result.toString();
    }

    /**
     * Helper method to convert numbers to words
     */
    private static String convertToWords(long number) {
        if (number == 0) {
            return "";
        }

        if (number < 10) {
            return ONES[(int) number];
        }

        if (number < 20) {
            return TEENS[(int) (number - 10)];
        }

        if (number < 100) {
            return TENS[(int) (number / 10)] + (number % 10 > 0 ? " " + ONES[(int) (number % 10)] : "");
        }

        if (number < 1000) {
            return ONES[(int) (number / 100)] + " Hundred"
                    + (number % 100 > 0 ? " " + convertToWords(number % 100) : "");
        }

        int scaleIndex = 0;
        StringBuilder words = new StringBuilder();

        while (number > 0) {
            if (number % 1000 != 0) {
                words.insert(0, convertToWords(number % 1000) + " " + SCALES[scaleIndex] + " ");
            }
            number /= 1000;
            scaleIndex++;
        }

        return words.toString().trim();
    }
}
