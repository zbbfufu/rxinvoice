package rxinvoice.service;

import restx.security.RestxSessionCookieFilter;

import java.io.IOException;
import java.io.OutputStream;

public interface PrintService {
    void exportUriToPdf(String baseUrl, RestxSessionCookieFilter sessionFilter, String pageUri, OutputStream outputStream) throws IOException;
}
