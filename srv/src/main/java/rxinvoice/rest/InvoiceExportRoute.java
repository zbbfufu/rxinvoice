package rxinvoice.rest;

import com.google.common.net.HttpHeaders;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.utils.OptionalUtils;

import java.io.IOException;

/**
 */
@Component
public class InvoiceExportRoute extends StdRoute {
    private final InvoiceResource invoiceResource;

    public InvoiceExportRoute(InvoiceResource invoiceResource) {
        super("exports", new StdRestxRequestMatcher("GET", "/exports/invoices"));
        this.invoiceResource = invoiceResource;
    }

    @Override
    public void handle(RestxRequestMatch match, final RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        resp.setStatus(HttpStatus.OK);
        resp.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"Report.xlsx\"");
        resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        invoiceResource.exportsInvoices(resp,
                OptionalUtils.convertToJ8Optional(req.getQueryParam("startDate")),
                OptionalUtils.convertToJ8Optional(req.getQueryParam("endDate")),
                OptionalUtils.convertToJ8Optional(req.getQueryParam("statuses")),
                OptionalUtils.convertToJ8Optional(req.getQueryParam("buyerRef")),
                OptionalUtils.convertToJ8Optional(req.getQueryParam("kind")),
                OptionalUtils.convertToJ8Optional(req.getQueryParam("query")));
    }
}
