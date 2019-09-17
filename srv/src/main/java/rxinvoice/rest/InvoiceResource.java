package rxinvoice.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.RestxResponse;
import restx.Status;
import restx.annotations.*;
import restx.factory.Component;
import restx.security.RolesAllowed;
import rxinvoice.domain.Invoice;
import rxinvoice.domain.enumeration.Activity;
import rxinvoice.service.InvoiceSearchFilter;
import rxinvoice.service.InvoiceService;

import java.util.*;
import java.util.Optional;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;
import static rxinvoice.domain.enumeration.Status.*;

/**
 *
 */
@Component
@RestxResource
public class InvoiceResource {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceResource.class);

    private final InvoiceService invoiceService;

    public InvoiceResource(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @POST("/invoices")
    public Invoice createInvoice(Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/invoices/{key}")
    public Invoice updateInvoice(String key, Invoice invoice) {
        return invoiceService.updateInvoice(key, invoice);
    }

    @GET("/invoices")
    public Iterable<Invoice> findInvoices(Optional<String> startDate,
                                          Optional<String> endDate,
                                          Optional<String> statuses,
                                          Optional<String> buyerRef,
                                          Optional<String> kind,
                                          Optional<String> query,
                                          Optional<String> reference) {
        return invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(startDate)
                .setEndDate(endDate)
                .setStatuses(statuses)
                .setBuyerRef(buyerRef)
                .setKind(kind)
                .setQuery(query)
                .setReference(reference));
    }

    @GET("/invoices/toPrepare")
    public Iterable<Invoice> findToPrepareInvoices() {
        return invoiceService.findToPrepareInvoices();
    }

    @GET("/invoices/tasks")
    public List<Invoice> findTasks(String maxDate) {
        return invoiceService.findTasks(maxDate);
    }

    @GET("/invoices/dates/{startDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate) {
        return invoiceService.findInvoices(new InvoiceSearchFilter().setStartDate(Optional.of(startDate)));
    }

    @GET("/invoices/dates/{startDate}/{endDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate, String endDate) {
        return invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(Optional.of(startDate))
                .setEndDate(Optional.of(endDate)));
    }

    @GET("/invoices/status")
    public Iterable<rxinvoice.domain.enumeration.Status> findInvoiceStatus() {
        return Arrays.asList(values());
    }

    @GET("/invoices/activities")
    public Iterable<Activity> findInvoiceActivities() {
        return Arrays.asList(Activity.values());
    }

    @RolesAllowed({ADMIN})
    @GET("/invoices/update_amounts")
    public void computeMetrics() {
        invoiceService.computeMetrics();
    }

    @GET("/invoices/{key}")
    public Optional<Invoice> findInvoiceByKey(String key) {
        return invoiceService.findInvoiceByKey(key);
    }

    @RolesAllowed({ADMIN, SELLER})
    @DELETE("/invoices/{key}")
    public Status deleteInvoice(String key) {
        return invoiceService.deleteInvoice(key);
    }

    @RolesAllowed({ADMIN, SELLER})
    @DELETE("/invoices/{invoiceId}/attachments/{attachmentId}")
    public void deleteInvoice(String invoiceId, String attachmentId) {
        invoiceService.deleteInvoice(invoiceId, attachmentId);
    }
}
