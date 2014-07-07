package rxinvoice.rest;

import com.google.common.base.Optional;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.http.HttpStatus;
import restx.Status;
import restx.WebException;
import restx.annotations.*;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.security.RolesAllowed;
import rxinvoice.AppModule;
import rxinvoice.domain.Invoice;
import rxinvoice.domain.User;

import javax.inject.Named;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;

/**
 */
@Component @RestxResource
public class InvoiceResource {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceResource.class);

    private final JongoCollection invoices;
    private final CompanyResource companyResource;

    public InvoiceResource(@Named("invoices") JongoCollection invoices, CompanyResource companyResource) {
        this.invoices = invoices;
        this.companyResource = companyResource;
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
        }

        updateAmounts(invoice);

        invoices.get().save(invoice);
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

    @GET("/invoices/status")
    public Iterable<Invoice.Status> findInvoiceStatus() {
        return Arrays.asList(Invoice.Status.values());
    }

    @GET("/invoices/{key}")
    public Optional<Invoice> findInvoiceByKey(String key) {
        Optional<Invoice> invoice = Optional.fromNullable(invoices.get().findOne(new ObjectId(key)).as(Invoice.class));
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
            return Status.of("deleted");
        } else {
            throw new WebException(HttpStatus.NOT_FOUND);
        }
    }


    private void updateAmounts(Invoice invoice) {
        BigDecimal grossAmount = BigDecimal.ZERO;
        BigDecimal vatAmountLine = BigDecimal.ZERO;
        BigDecimal netAmount = BigDecimal.ZERO;
        Map<String, Invoice.VATAmount> vatAmounts = new TreeMap<>();
        for (Invoice.Line line : invoice.getLines()) {
            if (line.getQuantity() != null && line.getUnitCost() != null) {
                line.setGrossAmount(line.getQuantity().multiply(line.getUnitCost()));
                grossAmount = grossAmount.add(line.getGrossAmount());
                if (line.getVat() != null) {
                    vatAmountLine = line.getGrossAmount().multiply(line.getVat().getAmount().divide(new BigDecimal(100)));
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

        invoice.setVatsAmount(new ArrayList<Invoice.VATAmount>(vatAmounts.values()));
        invoice.setGrossAmount(grossAmount);
        if (invoice.isWithVAT()) {
            invoice.setNetAmount(netAmount);
        } else {
            invoice.setNetAmount(grossAmount);
        }
    }
}
