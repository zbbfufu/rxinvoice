package rxinvoice.service;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.joda.time.DateTime;
import restx.factory.Component;
import restx.i18n.Messages;
import rxinvoice.domain.VATAmount;
import rxinvoice.domain.invoice.Invoice;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;

@Component
public class InvoiceExportService {
    private static final int REFERENCE = 0;
    private static final int KIND = 1;
    private static final int BUYER = 2;
    private static final int BUSINESS = 3;
    private static final int OBJECT = 4;
    private static final int DATE = 5;
    private static final int STATUS = 6;
    private static final int GROSS_AMOUNT = 7;
    private static final int NET_AMOUNT = 8;
    private static final int VAT = 9;
    private final Messages messages;

    public InvoiceExportService(Messages messages) {
        this.messages = messages;
    }

    public void exportInvoices(Iterable<Invoice> invoices, OutputStream outputStream) throws IOException {
        XSSFWorkbook myWorkBook = new XSSFWorkbook();
        XSSFSheet mySheet = myWorkBook.createSheet();

        writeHeaderRow(mySheet.createRow(0));

        int rowCounter = 1;

        for (Invoice invoice : invoices) {
            XSSFRow row = mySheet.createRow(rowCounter);
            writeRow(row, invoice);
            rowCounter++;
        }

        myWorkBook.write(outputStream);
    }

    private void writeRow(XSSFRow row, Invoice invoice) {
        createCell(row, REFERENCE, invoice.getReference());
        if (invoice.getKind() != null) {
            createCell(row, KIND, invoice.getKind().name());
        }
        if (invoice.getBuyer() != null) {
            createCell(row, BUYER, invoice.getBuyer().getName());
        }
        if (invoice.getBusiness() != null) {
            createCell(row, BUSINESS, invoice.getBusiness().getName());
        }
        createCell(row, OBJECT, invoice.getObject());
        createCell(row, DATE, invoice.getDate());
        createCell(row, STATUS, messages.getMessage("invoice.status." + invoice.getStatus().name()));
        createCell(row, GROSS_AMOUNT, invoice.getGrossAmount());
        createCell(row, NET_AMOUNT, invoice.getNetAmount());

        BigDecimal sumOfVatAmounts = BigDecimal.ZERO;

        for (VATAmount vatAmount : invoice.getVatsAmount()) {
            sumOfVatAmounts = sumOfVatAmounts.add(vatAmount.getAmount());
        }

        createCell(row, VAT, sumOfVatAmounts);
    }

    private void writeHeaderRow(XSSFRow row) {
        createCell(row, REFERENCE, "Ref");
        createCell(row, KIND, "Kind");
        createCell(row, BUYER, "Buyer");
        createCell(row, BUSINESS, "Business");
        createCell(row, OBJECT, "Object");
        createCell(row, DATE, "Date");
        createCell(row, STATUS, "Status");
        createCell(row, GROSS_AMOUNT, "Gross amount");
        createCell(row, NET_AMOUNT, "Net amount");
        createCell(row, VAT, "VAT");
    }

    private void createCell(XSSFRow row , int cellIndex, String value) {
        if (value != null) {
            row.createCell(cellIndex).setCellValue(value);
        }
    }

    private void createCell(XSSFRow row , int cellIndex, BigDecimal value) {
        if (value != null) {
            XSSFCell cell = row.createCell(cellIndex);
            cell.setCellType(CellType.NUMERIC);
            cell.setCellValue(value.doubleValue());
        }
    }

    private void createCell(XSSFRow row , int cellIndex, DateTime value) {
        if (value != null) {
            row.createCell(cellIndex).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(value.toDate()));
        }
    }
}
