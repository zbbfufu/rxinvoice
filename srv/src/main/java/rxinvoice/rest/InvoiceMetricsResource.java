package rxinvoice.rest;

import com.google.common.base.Optional;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.factory.Factory;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Company;
import rxinvoice.domain.Invoice;

import javax.inject.Named;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class InvoiceMetricsResource {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceMetricsResource.class);

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    private CompanyResource companyResource;
    private InvoiceResource invoiceResource;
    private JongoCollection companies;
    private JongoCollection invoices;

    public InvoiceMetricsResource(CompanyResource companyResource,
                                  InvoiceResource invoiceResource,
                                  @Named("companies") JongoCollection companies,
                                  @Named("invoices") JongoCollection invoices) {
        this.companyResource = companyResource;
        this.invoiceResource = invoiceResource;

        this.companies = companies;
        this.invoices = invoices;
    }

    private Company getCompany(Company company) {
        return companies.get().findOne(new ObjectId(company.getKey())).as(Company.class);
    }

    private void computeCompanyMetricsAsync(final Company company) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                final Factory factory = Factory.builder().addFromServiceLoader().build();

                try {
                    factory.queryByClass(InvoiceMetricsResource.class).findOneAsComponent().get().computeCompanyMetrics(company);
                } catch (Exception e) {
                    logger.error("Error in computeCompanyMetricsAsync", e);
                    throw new RuntimeException(e);
                } finally {
                    factory.close();
                }
            }
        });
    }

    public void computeCompanyMetricsSync(final Company company) {
        computeCompanyMetrics(company);
    }

    public void computeCompanyMetricsAsync(String companyId) {
        final Optional<Company> companyOptional = companyResource.findCompanyByKey(companyId);

        if (companyOptional.isPresent()) {
            computeCompanyMetricsAsync(companyOptional.get());
        }
    }

    public void computeAllCompanyMetricsAsync() {
        final Iterable<Company> companyList = companyResource.findCompanies();

        for (Company company : companyList) {
            computeCompanyMetricsAsync(company);
        }
    }

    private void computeCompanyMetrics(Company company) {
        logger.debug("Begin to compute company metrics for company {}", company.getKey());

        Company.Metrics metrics = getCompany(company).getMetrics();

        if (metrics == null) {
            metrics = new Company.Metrics();
        }

        Iterable<Invoice> list = invoices.get().find("{ buyer._id: #}", new ObjectId(company.getKey())).as(Invoice.class);

        int nbInvoices = 0;
        BigDecimal expected = new BigDecimal(0);
        BigDecimal expired = new BigDecimal(0);
        BigDecimal invoiced = new BigDecimal(0);
        BigDecimal paid = new BigDecimal(0);
        for (Invoice invoice : list) {
            nbInvoices++;

            switch (invoice.getStatus()) {
                case PAID: paid = paid.add(invoice.getGrossAmount());break;
                case SENT: invoiced = invoiced.add(invoice.getGrossAmount());break;
                case LATE: expired = expired.add(invoice.getGrossAmount());break;
                case READY: expected = expected.add(invoice.getGrossAmount());break;
            }
        }



        metrics.setExpected(expected);
        metrics.setExpired(expired);
        metrics.setInvoiced(invoiced);
        metrics.setPaid(paid);
        metrics.setNbInvoices(nbInvoices);

        company.setMetrics(metrics);
        companies.get().save(company);

        logger.debug("End to compute company metrics for company {}", company.getKey());
    }

    private BigDecimal divide(BigDecimal a, BigDecimal b) {
        try {
            return a.divide(b, BigDecimal.ROUND_HALF_UP);
        } catch (ArithmeticException ae) {
            logger.debug("Can not divide", ae);
            return null;
        }
    }

    public void computeInvoiceMetricsSync(Invoice invoice) {
        if (invoice != null && invoice.getBuyer() != null) {
            computeCompanyMetricsSync(invoice.getBuyer());
        }
    }
}
