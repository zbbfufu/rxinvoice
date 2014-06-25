package rxinvoice.domain;

import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import restx.jackson.FixedPrecision;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 */
public class Company {
    @Id @ObjectId
    private String key;

    private String name;

    private Address address;

    private Metrics metrics;

    private List<Business> business = new ArrayList<>();

    public String getKey() {
        return key;
    }

    public String getName() {
        return name;
    }

    public Address getAddress() {
        return address;
    }

    public Metrics getMetrics() {
        return metrics;
    }

    public List<Business> getBusiness() {
        return business;
    }

    public Company setKey(final String key) {
        this.key = key;
        return this;
    }

    public Company setName(final String name) {
        this.name = name;
        return this;
    }

    public Company setAddress(final Address address) {
        this.address = address;
        return this;
    }

    public Company setMetrics(Metrics metrics) {
        this.metrics = metrics;
        return this;
    }

    public Company setBusiness(List<Business> business) {
        this.business = business;
        return this;
    }

    @Override
    public String toString() {
        return "Company{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", metrics=" + metrics +
                ", business=" + business +
                '}';
    }


    public static class Metrics {
        private int nbInvoices;
        @FixedPrecision(2)
        private BigDecimal expected;
        @FixedPrecision(2)
        private BigDecimal expired;
        @FixedPrecision(2)
        private BigDecimal invoiced;
        @FixedPrecision(2)
        private BigDecimal paid;


        public int getNbInvoices() {
            return nbInvoices;
        }

        public void setNbInvoices(int nbInvoices) {
            this.nbInvoices = nbInvoices;
        }

        public BigDecimal getExpected() {
            return expected;
        }

        public void setExpected(BigDecimal expected) {
            this.expected = expected;
        }

        public BigDecimal getExpired() {
            return expired;
        }

        public void setExpired(BigDecimal expired) {
            this.expired = expired;
        }

        public BigDecimal getInvoiced() {
            return invoiced;
        }

        public void setInvoiced(BigDecimal invoiced) {
            this.invoiced = invoiced;
        }

        public BigDecimal getPaid() {
            return paid;
        }

        public void setPaid(BigDecimal paid) {
            this.paid = paid;
        }


        @Override
        public String toString() {
            return "Metrics{" +
                    "nbInvoices=" + nbInvoices +
                    ", expected=" + expected +
                    ", expired=" + expired +
                    ", invoiced=" + invoiced +
                    ", paid=" + paid +
                    '}';
        }
    }
}
