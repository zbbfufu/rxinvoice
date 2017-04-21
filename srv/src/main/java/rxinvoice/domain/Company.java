package rxinvoice.domain;

import org.joda.time.LocalDate;
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

    private FiscalYear fiscalYear = FiscalYear.DEFAULT;

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

    public KindCompany getKind() {
        return kind;
    }

    public Company setKind(KindCompany kind) {
        this.kind = kind;
        return this;
    }

    public FiscalYear getFiscalYear() {
        return fiscalYear;
    }

    public Company setFiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
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
                ", vats=" + vats +
                ", fiscalYear=" + fiscalYear +
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

    public static class FiscalYear {
        private LocalDate start;
        private LocalDate end;

        public static final FiscalYear DEFAULT = new FiscalYear()
                .setStart(firstDayOfYear())
                .setEnd(lastDayOfYear())
                .current();

        public LocalDate getStart() {
            return start;
        }

        public FiscalYear setStart(LocalDate start) {
            this.start = start;
            return this;
        }

        public LocalDate getEnd() {
            return end;
        }

        public FiscalYear setEnd(LocalDate end) {
            this.end = end;
            return this;
        }

        private static LocalDate firstDayOfYear() {
            return LocalDate.now().withMonthOfYear(1).withDayOfMonth(1);
        }

        private static LocalDate lastDayOfYear() {
            return LocalDate.now().withMonthOfYear(12).withDayOfMonth(31);
        }

        public FiscalYear current() {
            LocalDate start = this.start.withYear(LocalDate.now().getYear());
            LocalDate end = this.end.withYear(LocalDate.now().getYear());

            if (LocalDate.now().isBefore(start)) {
                start = start.minusYears(1);
            }

            if (LocalDate.now().isAfter(end)) {
                end = end.plusYears(1);
            }

            return new FiscalYear()
                    .setStart(start)
                    .setEnd(end);
        }

        public FiscalYear previous() {
            return new FiscalYear()
                    .setStart(start.minusYears(1))
                    .setEnd(end.minusYears(1));
        }

        public FiscalYear next() {
            return new FiscalYear()
                    .setStart(start.plusYears(1))
                    .setEnd(end.plusYears(1));
        }

        @Override
        public String toString() {
            return "FiscalYear{" +
                    "start=" + start +
                    ", end=" + end +
                    '}';
        }
    }
}
