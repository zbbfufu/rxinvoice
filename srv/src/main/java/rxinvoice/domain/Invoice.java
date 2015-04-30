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
public class Invoice {
    @Id @ObjectId
    private String key;

    private String reference;
    private DateTime date;
    private Status status;
    private boolean withVAT;
    private String object;
    private String comment;
    private Kind kind;

    private Company seller;
    private Company buyer;

    @FixedPrecision(2)
    private BigDecimal grossAmount;
    private List<VATVal> vats = new ArrayList<>();
    @FixedPrecision(2)
    private BigDecimal netAmount;
    private List<VATAmount> vatsAmount = new ArrayList<>();

    private Business business;

    private List<Line> lines = new ArrayList<>();

    public String getKey() {
        return key;
    }

    public String getReference() {
        return reference;
    }

    public DateTime getDate() {
        return date;
    }

    public Status getStatus() {
        return status;
    }

    public boolean isWithVAT() {
        return withVAT;
    }

    public String getObject() {
        return object;
    }

    public String getComment() {
        return comment;
    }

    public Company getSeller() {
        return seller;
    }

    public Company getBuyer() {
        return buyer;
    }

    public BigDecimal getGrossAmount() {
        return grossAmount;
    }

    public List<VATVal> getVats() {
        return vats;
    }

    public BigDecimal getNetAmount() {
        return netAmount;
    }

    public Business getBusiness() {
        return business;
    }

    public List<Line> getLines() {
        return lines;
    }

    public List<VATAmount> getVatsAmount() {
        return vatsAmount;
    }

    public Invoice setKey(final String key) {
        this.key = key;
        return this;
    }

    public Invoice setReference(final String reference) {
        this.reference = reference;
        return this;
    }

    public Invoice setDate(final DateTime date) {
        this.date = date;
        return this;
    }

    public Invoice setStatus(final Status status) {
        this.status = status;
        return this;
    }

    public Invoice setWithVAT(boolean withVAT) {
        this.withVAT = withVAT;
        return this;
    }

    public Invoice setObject(String object) {
        this.object = object;
        return this;
    }

    public Invoice setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public Invoice setSeller(final Company seller) {
        this.seller = seller;
        return this;
    }

    public Invoice setBuyer(final Company buyer) {
        this.buyer = buyer;
        return this;
    }

    public Invoice setGrossAmount(final BigDecimal grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }

    public Invoice setVats(final List<VATVal> vats) {
        this.vats = vats;
        return this;
    }

    public Invoice setNetAmount(final BigDecimal netAmount) {
        this.netAmount = netAmount;
        return this;
    }

    public Invoice setBusiness(final Business business) {
        this.business = business;
        return this;
    }

    public Invoice setLines(final List<Line> lines) {
        this.lines = lines;
        return this;
    }

    public Invoice setVatsAmount(List<VATAmount> vatsAmount) {
        this.vatsAmount = vatsAmount;
        return this;
    }

    public Kind getKind() {
        return kind;
    }

    public Invoice setKind(Kind kind) {
        this.kind = kind;
        return this;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "key='" + key + '\'' +
                ", reference='" + reference + '\'' +
                ", date=" + date +
                ", status=" + status +
                ", withVAT=" + withVAT +
                ", object='" + object + '\'' +
                ", comment='" + comment + '\'' +
                ", seller=" + seller +
                ", buyer=" + buyer +
                ", grossAmount=" + grossAmount +
                ", vats=" + vats +
                ", netAmount=" + netAmount +
                ", vatsAmount=" + vatsAmount +
                ", business=" + business +
                ", lines=" + lines +
                '}';
    }

    public static enum Status {
        DRAFT, READY, SENT, LATE, PAID, CANCELLED, WAITING_VALIDATION, VALIDATED
    }

    public static enum Kind {
        SUBCONTRACTING, FEE, SERVICE, BUY_SELL, TRAINING
    }

    public static class VATAmount {
        private String vat;
        @FixedPrecision(2)
        private BigDecimal amount;

        public String getVat() {
            return vat;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public VATAmount setVat(String vat) {
            this.vat = vat;
            return this;
        }

        public VATAmount setAmount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }


        @Override
        public String toString() {
            return "VATAmount{" +
                    "vat='" + vat + '\'' +
                    ", amount=" + amount +
                    '}';
        }
    }

    public static class Line {
        private String description;
        @FixedPrecision(2)
        private BigDecimal quantity;
        @FixedPrecision(2)
        private BigDecimal unitCost;
        @FixedPrecision(2)
        private BigDecimal grossAmount;

        private VATVal vat;

        public String getDescription() {
            return description;
        }

        public BigDecimal getQuantity() {
            return quantity;
        }

        public BigDecimal getUnitCost() {
            return unitCost;
        }

        public BigDecimal getGrossAmount() {
            return grossAmount;
        }

        public VATVal getVat() {
            return vat;
        }

        public Line setDescription(final String description) {
            this.description = description;
            return this;
        }

        public Line setQuantity(final BigDecimal quantity) {
            this.quantity = quantity;
            return this;
        }

        public Line setUnitCost(final BigDecimal unitCost) {
            this.unitCost = unitCost;
            return this;
        }

        public Line setGrossAmount(final BigDecimal grossAmount) {
            this.grossAmount = grossAmount;
            return this;
        }

        public Line setVat(final VATVal vat) {
            this.vat = vat;
            return this;
        }

        @Override
        public String toString() {
            return "Line{" +
                    "description='" + description + '\'' +
                    ", quantity=" + quantity +
                    ", unitCost=" + unitCost +
                    ", grossAmount=" + grossAmount +
                    ", vat=" + vat +
                    '}';
        }
    }
}
