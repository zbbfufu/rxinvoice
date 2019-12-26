package rxinvoice.service.invoice;

import com.google.common.collect.Lists;
import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.factory.Factory;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.company.FiscalYear;
import rxinvoice.domain.company.SellerCompanyMetrics;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.Metrics;
import rxinvoice.service.company.CompanyService;
import rxinvoice.service.company.SellerCompanyMetricsService;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class InvoiceMetricsService {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceMetricsService.class);

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    private final SellerCompanyMetricsService sellerCompanyMetricsService;
    private final CompanyService companyService;
    private final InvoiceService invoiceService;

    public InvoiceMetricsService(SellerCompanyMetricsService sellerCompanyMetricsService,
                                 CompanyService companyService,
                                 InvoiceService invoiceService) {
        this.sellerCompanyMetricsService = sellerCompanyMetricsService;
        this.companyService = companyService;
        this.invoiceService = invoiceService;
    }

    private Company getCompany(String key) {
        return checkPresent(companyService.findCompanyByKey(key), String.format("Company not found for key %s", key));
    }

    private void computeCompanyMetricsAsync(String sellerCompanyKey, final Company company) {
        executorService.submit(() -> {
            final Factory factory = Factory.builder().addFromServiceLoader().build();

            try {
                factory.queryByClass(InvoiceMetricsService.class).findOneAsComponent().get().computeCompanyMetrics(sellerCompanyKey, company.getKey());
            } catch (Exception e) {
                logger.error("Error in computeCompanyMetricsAsync", e);
                throw new RuntimeException(e);
            } finally {
                factory.close();
            }
        });
    }

    public void computeCompanyMetricsSync(final String sellerCompanyKey, final Company company) {
        computeCompanyMetrics(sellerCompanyKey, company.getKey());
    }

    public void computeAllCompanyMetricsAsync(String sellerCompanyKey) {
        final Iterable<Company> companyList = companyService.findCompanies(Optional.empty());

        for (Company company : companyList) {
            computeCompanyMetricsAsync(sellerCompanyKey, company);
        }
    }

    private void computeCompanyMetrics(String sellerCompanyKey, String buyerCompanyKey) {
        logger.debug("Begin to compute company metrics for company {}", buyerCompanyKey);

        Company company = getCompany(buyerCompanyKey);
        Company seller = getCompany(sellerCompanyKey);

        List<Invoice> invoiceList = Lists.newArrayList(invoiceService.findInvoicesByBuyer(company.getKey()));
        Metrics metrics = computeFiscalYearMetrics(invoiceList, Optional.empty());
        company.setMetrics(metrics);
        companyService.saveCompany(company);


        Optional<SellerCompanyMetrics> sellerCompanyMetricsOptional =
                sellerCompanyMetricsService.findBySellerRef(sellerCompanyKey);

        SellerCompanyMetrics sellerCompanyMetrics = sellerCompanyMetricsOptional
                .orElse(new SellerCompanyMetrics());

        FiscalYear current = seller.getFiscalYear().current();
        FiscalYear previous = current.previous();
        FiscalYear next = current.next();

        Map<String, Metrics> fiscalYearMetricsMap =
                sellerCompanyMetrics.getBuyerCompaniesMetrics().getOrDefault(buyerCompanyKey, new HashMap<>());

        fiscalYearMetricsMap.put(SellerCompanyMetrics.PREVIOUS_YEAR,
                computeFiscalYearMetrics(invoiceList, Optional.of(previous)));
        fiscalYearMetricsMap.put(SellerCompanyMetrics.CURRENT_YEAR,
                computeFiscalYearMetrics(invoiceList, Optional.of(current)));
        fiscalYearMetricsMap.put(SellerCompanyMetrics.NEXT_YEAR,
                computeFiscalYearMetrics(invoiceList, Optional.of(next)));

        if (sellerCompanyMetrics.getKey() == null) {
            sellerCompanyMetrics.getBuyerCompaniesMetrics().put(buyerCompanyKey, fiscalYearMetricsMap);
            sellerCompanyMetricsService.saveCompanyMetrics(sellerCompanyMetrics
                    .setSellerRef(sellerCompanyKey));
        } else {
            sellerCompanyMetricsService.updateBuyerCompanyMetrics(sellerCompanyKey, buyerCompanyKey, fiscalYearMetricsMap);
        }
        logger.debug("End to compute company metrics for company {}", company.getKey());
    }

    private Metrics computeFiscalYearMetrics(List<Invoice> invoices,  Optional<FiscalYear> fiscalYearOptional) {
        Metrics metrics = new Metrics();
        if (fiscalYearOptional.isPresent()) {
            invoices = invoices.stream()
                    .filter(invoice -> invoice.getDate() != null)
                    .filter(invoice -> {
                        LocalDate invoiceDate = invoice.getDate().toLocalDate();
                        return (invoiceDate.isAfter(fiscalYearOptional.get().getStart())
                                || invoiceDate.isEqual(fiscalYearOptional.get().getStart()))
                                && invoiceDate.isBefore(fiscalYearOptional.get().getEnd());
                    })
                    .collect(Collectors.toList());
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
            computeCompanyMetricsSync(invoice.getSeller().getKey(), invoice.getBuyer());
        }
    }
}
