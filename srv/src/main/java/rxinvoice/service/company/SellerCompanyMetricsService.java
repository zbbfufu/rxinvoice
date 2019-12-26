package rxinvoice.service.company;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Metrics;
import rxinvoice.domain.company.SellerCompanyMetrics;

import javax.inject.Named;
import java.util.Map;
import java.util.Optional;

@Component
public class SellerCompanyMetricsService {

    private static final Logger logger = LoggerFactory.getLogger(SellerCompanyMetricsService.class);

    private JongoCollection sellerCompanyMetrics;

    public SellerCompanyMetricsService(@Named("sellerCompanyMetrics") JongoCollection sellerCompanyMetrics) {
        this.sellerCompanyMetrics = sellerCompanyMetrics;
    }

    public Optional<SellerCompanyMetrics> findBySellerRef(String sellerRef) {
        return Optional.ofNullable(this.sellerCompanyMetrics.get()
                .findOne("{sellerRef: #}", sellerRef)
                .as(SellerCompanyMetrics.class));
    }


    public void saveCompanyMetrics(SellerCompanyMetrics companyMetrics) {
        this.sellerCompanyMetrics.get().save(companyMetrics);
        logger.debug("Saved company metrics {}", companyMetrics);
    }


    public void updateBuyerCompanyMetrics(String sellerCompanyKey,
                                          String buyerCompanyKey,
                                          Map<String, Metrics> fiscalYearMetricsMap) {
        this.sellerCompanyMetrics.get()
                .update("{sellerRef: #, }", sellerCompanyKey)
                .with("{$set: {buyerCompaniesMetrics." + buyerCompanyKey + ": #}}",
                        fiscalYearMetricsMap);

        logger.debug("Updated company metrics for seller company {} and buyer company {} with {}",
                sellerCompanyKey, buyerCompanyKey, fiscalYearMetricsMap);
    }
}
