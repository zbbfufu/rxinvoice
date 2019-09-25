package rxinvoice.rest;

import com.google.common.collect.Lists;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.factory.Factory;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Company;
import rxinvoice.domain.FiscalYear;
import rxinvoice.domain.Invoice;
import rxinvoice.domain.Metrics;
import rxinvoice.service.CompanyService;
import rxinvoice.service.InvoiceService;

import javax.inject.Named;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class InvoiceMetricsService {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceMetricsService.class);

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    private final CompanyService companyService;
    private final InvoiceService invoiceService;

    public InvoiceMetricsService(CompanyService companyService,
                                 InvoiceService invoiceService) {
        this.companyService = companyService;
        this.invoiceService = invoiceService;
    }

    private Company getCompany(String key) {
        return checkPresent(companyService.findCompanyByKey(key), String.format("COmpnay not found for key %s", key));
    }

    private void computeCompanyMetricsAsync(final Company company) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                final Factory factory = Factory.builder().addFromServiceLoader().build();

                try {
                    factory.queryByClass(InvoiceMetricsService.class).findOneAsComponent().get().computeCompanyMetrics(company.getKey());
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
        computeCompanyMetrics(company.getKey());
    }

    public void computeCompanyMetricsAsync(String companyId) {
        Company company = checkPresent(companyService.findCompanyByKey(companyId), String.format("Company not found for id: %s", companyId));
        computeCompanyMetricsAsync(company);
    }

    public void computeAllCompanyMetricsAsync() {
        final Iterable<Company> companyList = companyService.findCompanies(Optional.empty());

        for (Company company : companyList) {
            computeCompanyMetricsAsync(company);
        }
    }

    private void computeCompanyMetrics(String companyKey) {
        logger.debug("Begin to compute company metrics for company {}", companyKey);

        Company company = getCompany(companyKey);

        List<Invoice> invoiceList = Lists.newArrayList(invoiceService.findInvoicesByBuyer(company.getKey()));

        Metrics metrics = computeFiscalYearMetrics(invoiceList, Optional.empty());

        FiscalYear current = FiscalYear.DEFAULT;
        FiscalYear previous = current.previous();
        FiscalYear next = current.next();

        company.getFiscalYearMetricsMap().put(-1, computeFiscalYearMetrics(invoiceList, Optional.of(previous)));
        company.getFiscalYearMetricsMap().put(0, computeFiscalYearMetrics(invoiceList, Optional.of(current)));
        company.getFiscalYearMetricsMap().put(1, computeFiscalYearMetrics(invoiceList, Optional.of(next)));

        company.setMetrics(metrics);
        companyService.saveCompany(company);

        logger.debug("End to compute company metrics for company {}", company.getKey());
    }

    private Metrics computeFiscalYearMetrics(List<Invoice> invoices,  Optional<FiscalYear> fiscalYearOptional) {
        Metrics metrics = new Metrics();
        if (fiscalYearOptional.isPresent()) {
            invoices = invoices.stream()
                    .filter(invoice -> invoice.getDate() != null)
                    .filter(invoice -> invoice.getDate().toLocalDate().isAfter(fiscalYearOptional.get().getStart())
                            && invoice.getDate().toLocalDate().isBefore(fiscalYearOptional.get().getEnd())).collect(Collectors.toList());
        }
        int nbInvoices = 0;
        BigDecimal expected = BigDecimal.ZERO;
        BigDecimal expired = BigDecimal.ZERO;
        BigDecimal invoiced = BigDecimal.ZERO;
        BigDecimal paid = BigDecimal.ZERO;
        BigDecimal cancelled = BigDecimal.ZERO;
        for (Invoice invoice : invoices) {
            nbInvoices++;

            switch (invoice.getStatus()) {
                case PAID: paid = paid.add(invoice.getGrossAmount());break;
                case SENT: invoiced = invoiced.add(invoice.getGrossAmount());break;
                case LATE: expired = expired.add(invoice.getGrossAmount());break;
                case READY: expected = expected.add(invoice.getGrossAmount());break;
                case DRAFT: expected = expected.add(invoice.getGrossAmount());break;
                case WAITING_VALIDATION: expected = expected.add(invoice.getGrossAmount());break;
                case VALIDATED: expected = expected.add(invoice.getGrossAmount());break;
                case CANCELLED: cancelled = cancelled.add(invoice.getGrossAmount());break;
            }
        }
        metrics.setExpected(expected);
        metrics.setExpired(expired);
        metrics.setInvoiced(invoiced);
        metrics.setCancelled(cancelled);
        metrics.setPaid(paid);
        metrics.setNbInvoices(nbInvoices);
        return metrics;
    }


    public void computeInvoiceMetricsSync(Invoice invoice) {
        if (invoice != null && invoice.getBuyer() != null) {
            computeCompanyMetricsSync(invoice.getBuyer());
        }
    }
}
