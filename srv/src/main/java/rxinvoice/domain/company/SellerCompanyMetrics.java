package rxinvoice.domain.company;

import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import rxinvoice.domain.Auditable;
import rxinvoice.domain.Metrics;

import java.util.HashMap;
import java.util.Map;

/**
 * Seller metrics result.
 */
public class SellerCompanyMetrics implements Auditable {

    public static final String PREVIOUS_YEAR = "previousYear";
    public static final String CURRENT_YEAR = "currentYear";
    public static final String NEXT_YEAR = "nextYear";

    @Id
    @ObjectId
    private String key;
    private String sellerRef;
    private Map<String, Map<String, Metrics>> buyerCompaniesMetrics = new HashMap<>();

    @Override
    public String getKey() {
        return key;
    }
    @Override
    public String getBusinessKey() {
        return sellerRef;
    }

    public static Map<String, Metrics> buildEmptyMetricsMap() {
        Map<String, Metrics> emptyMap = new HashMap<>();
        emptyMap.put(PREVIOUS_YEAR, new Metrics());
        emptyMap.put(CURRENT_YEAR, new Metrics());
        emptyMap.put(NEXT_YEAR, new Metrics());
        return emptyMap;
    }

    @Override
    public String toString() {
        return "SellerCompanyMetrics{" +
                "key='" + key + '\'' +
                ", sellerRef='" + sellerRef + '\'' +
                ", buyerCompaniesMetrics=" + buyerCompaniesMetrics +
                '}';
    }

    public SellerCompanyMetrics setKey(String key) {
        this.key = key;
        return this;
    }

    public String getSellerRef() {
        return sellerRef;
    }

    public SellerCompanyMetrics setSellerRef(String sellerRef) {
        this.sellerRef = sellerRef;
        return this;
    }

    public Map<String, Map<String, Metrics>> getBuyerCompaniesMetrics() {
        return buyerCompaniesMetrics;
    }

    public SellerCompanyMetrics setBuyerCompaniesMetrics(Map<String, Map<String, Metrics>> buyerCompaniesMetrics) {
        this.buyerCompaniesMetrics = buyerCompaniesMetrics;
        return this;
    }
}
