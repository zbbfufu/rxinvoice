package rxinvoice.service;

import java.io.IOException;
import java.io.OutputStream;

public interface PrintService {
    void exportUriToPdf(String invoiceId, OutputStream outputStream) throws IOException;
}
