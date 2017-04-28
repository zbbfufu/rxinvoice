package rxinvoice.domain;

import org.joda.time.DateTime;
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

    private String fullName;

    private String detail;

    private String legalNotice;

    private Boolean showLegalNoticeForeignBuyer;

    private Address address;

    private Metrics metrics;

    private List<Business> business = new ArrayList<>();

    private List<VATVal> vats = new ArrayList<>();

    private KindCompany kind;

    private DateTime creationDate;

    private String emailAddress;

    private DateTime lastSendDate;

    private DateTime lastPaymentDate;

    private InvoiceInfo lastSentInvoice;

    private InvoiceInfo lastPaidInvoice;

    public String getKey() {
        return key;
    }

    public String getName() {
        return name;
    }

    public String getFullName() {
        return fullName;
    }

    public String getDetail() {
        return detail;
    }

    public String getLegalNotice() {
        return legalNotice;
    }

    public Address getAddress() {
        return address;
    }

    public Metrics getMetrics() {
        return metrics;
    }

    public Boolean getShowLegalNoticeForeignBuyer() {
        return showLegalNoticeForeignBuyer;
    }

    public List<Business> getBusiness() {
        return business;
    }

    public List<VATVal> getVats() {
        return vats;
    }

    public DateTime getCreationDate() {
        return creationDate;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public DateTime getLastSendDate() {
        return lastSendDate;
    }

    public DateTime getLastPaymentDate() {
        return lastPaymentDate;
    }

    public InvoiceInfo getLastSentInvoice() {
        return lastSentInvoice;
    }

    public InvoiceInfo getLastPaidInvoice() {
        return lastPaidInvoice;
    }

    public Company setKey(final String key) {
        this.key = key;
        return this;
    }

    public Company setName(final String name) {
        this.name = name;
        return this;
    }

    public Company setFullName(final String fullName) {
        this.fullName = fullName;
        return this;
    }

    public Company setDetail(final String detail) {
        this.detail = detail;
        return this;
    }

    public Company setShowLegalNoticeForeignBuyer(Boolean showLegalNoticeForeignBuyer) {
        this.showLegalNoticeForeignBuyer = showLegalNoticeForeignBuyer;
        return this;
    }

    public Company setLegalNotice(String legalNotice) {
        this.legalNotice = legalNotice;
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

    public Company setVats(List<VATVal> vats) {
        this.vats = vats;
        return this;
    }

    public Company setCreationDate(DateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public Company setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public Company setLastSendDate(DateTime lastSendDate) {
        this.lastSendDate = lastSendDate;
        return this;
    }

    public Company setLastPaymentDate(DateTime lastPaymentDate) {
        this.lastPaymentDate = lastPaymentDate;
        return this;
    }

    public Company setLastSentInvoice(InvoiceInfo lastSentInvoice) {
        this.lastSentInvoice = lastSentInvoice;
        return this;
    }

    public Company setLastPaidInvoice(InvoiceInfo lastPaidInvoice) {
        this.lastPaidInvoice = lastPaidInvoice;
        return this;
    }

    public KindCompany getKind() {
        return kind;
    }

    public Company setKind(KindCompany kind) {
        this.kind = kind;
        return this;
    }

    @Override
    public String toString() {
        return "Company{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", fullName='" + fullName + '\'' +
                ", detail='" + detail + '\'' +
                ", legalNotice='" + legalNotice + '\'' +
                ", showLegalNoticeForeignBuyer=" + showLegalNoticeForeignBuyer +
                ", address=" + address +
                ", metrics=" + metrics +
                ", business=" + business +
                ", creationDate=" + creationDate +
                ", emailAddress=" + emailAddress +
                ", lastSendDate=" + lastSendDate +
                ", lastPaymentDate=" + lastPaymentDate +
                ", lastSentInvoice=" + lastSentInvoice +
                ", lastPaidInvoice=" + lastPaidInvoice +
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

    public static enum KindCompany {
        EDITOR, INHOUSE_SOLUTION_EDITOR, MAJOR_ACCOUNT, PME, FINAL_RECIPIENT
    }

    public static class InvoiceInfo {
        private String ref;
        @FixedPrecision(2)
        private BigDecimal grossAmount;
        @FixedPrecision(2)
        private BigDecimal netAmount;

        public InvoiceInfo() {
        }

        public InvoiceInfo(Invoice invoice) {
            ref = invoice.getKey();
            grossAmount = invoice.getGrossAmount();
            netAmount = invoice.getNetAmount();
        }

        public String getRef() {
            return ref;
        }

        public InvoiceInfo setRef(String ref) {
            this.ref = ref;
            return this;
        }

        public BigDecimal getGrossAmount() {
            return grossAmount;
        }

        public InvoiceInfo setGrossAmount(BigDecimal grossAmount) {
            this.grossAmount = grossAmount;
            return this;
        }

        public BigDecimal getNetAmount() {
            return netAmount;
        }

        public InvoiceInfo setNetAmount(BigDecimal netAmount) {
            this.netAmount = netAmount;
            return this;
        }

        @Override
        public String toString() {
            return "InvoiceInfo{" +
                    "ref='" + ref + '\'' +
                    ", grossAmount=" + grossAmount +
                    ", netAmount=" + netAmount +
                    '}';
        }
    }
}
