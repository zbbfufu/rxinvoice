package rxinvoice.rest;

import com.google.common.base.Optional;
import com.google.common.base.Predicates;
import com.google.common.collect.Collections2;
import com.google.common.eventbus.EventBus;
import org.bson.types.ObjectId;
import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.Status;
import restx.WebException;
import restx.annotations.*;
import restx.common.MorePreconditions;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.jongo.JongoCollection;
import restx.security.RolesAllowed;
import rxinvoice.AppModule;
import rxinvoice.domain.Blob;
import rxinvoice.domain.Invoice;
import rxinvoice.domain.User;
import rxinvoice.domain.enumeration.Activity;
import rxinvoice.rest.events.InvoiceUpdatedEvent;

import javax.inject.Named;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;

/**
 */
@Component @RestxResource
public class InvoiceResource {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceResource.class);

    private final JongoCollection invoices;
    private final BlobService blobService;
    private Optional<EventBus> eventBus;
    private final CompanyResource companyResource;

    public InvoiceResource(CompanyResource companyResource, Optional<EventBus> eventBus,
                           @Named("invoices") JongoCollection invoices, BlobService blobService) {
        this.companyResource = companyResource;
        this.eventBus = eventBus;
        this.invoices = invoices;
        this.blobService = blobService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @POST("/invoices")
    public Invoice createInvoice(Invoice invoice) {
        if (invoice.getSeller() == null) {
            User user = AppModule.currentUser();
            if (user.getPrincipalRoles().contains(SELLER)) {
                invoice.setSeller(companyResource.findCompanyByKey(user.getCompanyRef()).get());
            }
        }

        updateAmounts(invoice);

        invoices.get().save(invoice);
        if (eventBus.isPresent()) {
            eventBus.get().post(new InvoiceUpdatedEvent(invoice));
        }
        return invoice;
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/invoices/{key}")
    public Invoice updateInvoice(String key, Invoice invoice) {
        checkEquals("key", key, "invoice.key", invoice.getKey());
        Optional<Invoice> invoiceByKey = findInvoiceByKey(key);
        if (!invoiceByKey.isPresent()) {
            throw new WebException(HttpStatus.NOT_FOUND);
        }

        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            Invoice invoiceFromDB = invoiceByKey.get();

            if (invoiceFromDB.getSeller() == null || invoiceFromDB.getSeller().getKey() == null
                    || !invoiceFromDB.getSeller().getKey().equals(user.getCompanyRef())) {
                logger.warn("a seller is trying to update an invoice from a different company: user: {} - invoice: {}",
                        user.getName(), key);
                // we don't send a forbidden to avoid guessing existing invoice keys
                throw new WebException(HttpStatus.NOT_FOUND);
            }

            List<Blob> attachments = invoiceFromDB.getAttachments();
            List<Blob> newAttachments = invoice.getAttachments();

            Collection<Blob> attachmentsToRemove = Collections2.filter(attachments, Predicates.not(Predicates.in(newAttachments)));

            if (!attachmentsToRemove.isEmpty()) {
                for (Blob blob : attachmentsToRemove) {
                    blobService.definitiveDelete(blob.getId());
                }
            }
        }

        updateAmounts(invoice);

        invoices.get().save(invoice);
        if (eventBus.isPresent()) {
            eventBus.get().post(new InvoiceUpdatedEvent(invoice));
        }
        return invoice;
    }

    @GET("/invoices")
    public Iterable<Invoice> findInvoices() {
        User user = AppModule.currentUser();
        if (user.getPrincipalRoles().contains(ADMIN)) {
            return invoices.get().find().as(Invoice.class);
        } else {
            return invoices.get().find("{ $or: [ { seller._id: #}, { buyer._id: #}]}",
                    new ObjectId(user.getCompanyRef()), new ObjectId(user.getCompanyRef())).as(Invoice.class);
        }
    }


    @GET("/invoices/dates/{startDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate) {
        Date start = LocalDate.parse(startDate).toDateTime(LocalTime.MIDNIGHT).toDate();
        User user = AppModule.currentUser();
        if (user.getPrincipalRoles().contains(ADMIN)) {
            return invoices.get().find(
                    "{ date : {$gte:#} }",
                    start
            ).as(Invoice.class);
        } else {
            return invoices.get().find(
                    "{ $and: [ { date : {$gte:#} }, { $or: [ { seller._id: #}, { buyer._id: #} ] } ] }",
                    start, new ObjectId(user.getCompanyRef()), new ObjectId(user.getCompanyRef())
            ).as(Invoice.class);
        }
    }
    @GET("/invoices/dates/{startDate}/{endDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate, String endDate) {
        Date start = LocalDate.parse(startDate).toDateTime(LocalTime.MIDNIGHT).toDate();
        Date end = LocalDate.parse(endDate).toDateTime(LocalTime.MIDNIGHT)
                .withHourOfDay(23)
                .withMinuteOfHour(59)
                .withSecondOfMinute(59)
                .withMillisOfSecond(999)
                .toDate();
        User user = AppModule.currentUser();
        if (user.getPrincipalRoles().contains(ADMIN)) {
            return invoices.get().find(
                    "{ $and: [ { date : {$gte:#} }, { date : {$lte:#} } ] }",
                    start, end
            ).as(Invoice.class);
        } else {
            return invoices.get().find(
                    "{ $and: [ { date : {$gte:#} }, { date : {$lte:#} } , { $or: [ { seller._id: #}, { buyer._id: #} ] } ] }",
                    start, end, new ObjectId(user.getCompanyRef()), new ObjectId(user.getCompanyRef())
            ).as(Invoice.class);
        }
    }

    @GET("/invoices/status")
    public Iterable<rxinvoice.domain.enumeration.Status> findInvoiceStatus() {
        return Arrays.asList(rxinvoice.domain.enumeration.Status.values());
    }

    @GET("/invoices/activities")
    public Iterable<Activity> findInvoiceActivities() {
        return Arrays.asList(Activity.values());
    }

    @RolesAllowed({ADMIN})
    @GET("/invoices/update_amounts")
    public void computeMetrics() {
        for (Invoice invoice : invoices.get().find().as(Invoice.class)) {
            updateAmounts(invoice);
            invoices.get().save(invoice);
        }
    }

    @GET("/invoices/{key}")
    public Optional<Invoice> findInvoiceByKey(String key) {
        String referencePrefix = "REF-";
        Optional<Invoice> invoice;

        if (key.startsWith(referencePrefix)) {
            invoice = Optional.fromNullable(invoices.get()
                    .findOne("{ reference : # }", key.substring(referencePrefix.length())).as(Invoice.class));
        } else {
            invoice = Optional.fromNullable(invoices.get().findOne(new ObjectId(key)).as(Invoice.class));
        }

        if (invoice.isPresent()) {
            User user = AppModule.currentUser();
            if (!user.getPrincipalRoles().contains(ADMIN)) {
                if (((invoice.get().getSeller() == null || !user.getCompanyRef().equals(invoice.get().getSeller().getKey())))
                        && ((invoice.get().getBuyer() == null || !user.getCompanyRef().equals(invoice.get().getBuyer().getKey())))) {
                    return Optional.absent();
                }
            }
        }

        return invoice;
    }

    @RolesAllowed({ADMIN, SELLER})
    @DELETE("/invoices/{key}")
    public Status deleteInvoice(String key) {
        Optional<Invoice> invoice = findInvoiceByKey(key);
        if (invoice.isPresent()) {
            invoices.get().remove(new ObjectId(key));
            if (eventBus.isPresent()) {
                eventBus.get().post(new InvoiceUpdatedEvent(invoice.get()));
            }
            return Status.of("deleted");
        } else {
            throw new WebException(HttpStatus.NOT_FOUND);
        }
    }


    public void updateAmounts(Invoice invoice) {
        BigDecimal grossAmount = BigDecimal.ZERO;
        BigDecimal vatAmountLine = BigDecimal.ZERO;
        BigDecimal netAmount = BigDecimal.ZERO;
        Map<String, Invoice.VATAmount> vatAmounts = new TreeMap<>();
        for (Invoice.Line line : invoice.getLines()) {
            if (line.getQuantity() != null && line.getUnitCost() != null) {
                line.setGrossAmount(line.getQuantity().multiply(line.getUnitCost()));
                grossAmount = grossAmount.add(line.getGrossAmount());
                if (line.getVat() != null) {
                    vatAmountLine = line.getGrossAmount().multiply(line.getVat().getAmount().divide(new BigDecimal(100)))
                            .setScale(2, RoundingMode.HALF_UP);
                    Invoice.VATAmount vatAmount = vatAmounts.get(line.getVat().getVat());
                    String vat = line.getVat().getVat();
                    if (vatAmount == null) {
                        vatAmounts.put(vat, new Invoice.VATAmount().setVat(vat).setAmount(vatAmountLine));
                    } else {
                        vatAmounts.put(vat, vatAmount.setAmount(vatAmount.getAmount().add(vatAmountLine)));
                    }
                    netAmount = netAmount.add(vatAmountLine).add(line.getGrossAmount());
                }
            }
        }

        grossAmount = grossAmount.setScale(2, RoundingMode.HALF_UP);

        invoice.setVatsAmount(new ArrayList<Invoice.VATAmount>(vatAmounts.values()));
        invoice.setGrossAmount(grossAmount);
        if (invoice.isWithVAT()) {
            invoice.setNetAmount(netAmount.setScale(2, RoundingMode.HALF_UP));
        } else {
            invoice.setNetAmount(grossAmount);
        }
    }

    public Invoice addAttachments(String invoiceId, List<Blob> blobs) {
        Invoice invoice = MorePreconditions.checkPresent(findInvoiceByKey(invoiceId), "Invoice %s not found", invoiceId);

        invoice.addAttachments(blobs);

        return updateInvoice(invoiceId, invoice);
    }
}
