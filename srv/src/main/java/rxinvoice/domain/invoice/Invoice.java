package rxinvoice.domain.invoice;

import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import restx.i18n.Messages;
import restx.jackson.FixedPrecision;
import rxinvoice.domain.*;
import rxinvoice.domain.company.Business;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.enumeration.Kind;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 *
 */
public class Invoice implements Auditable {
    @Id
    @ObjectId
    private String key;

    private DateTime date;
    private DateTime dueDate;
    private DateTime sentDate;

    private Status status;
    private boolean withVAT;
    private List<VATVal> vats = new ArrayList<>();
    private List<VATAmount> vatsAmount = new ArrayList<>();
    private List<Line> lines = new ArrayList<>();
    private List<ActivityValue> activities = new ArrayList<>();
    private List<Blob> attachments = new ArrayList<>();
    private List<StatusChange> statusChanges = new ArrayList<>();

    private String reference;
    private String object;
    private String comment;
    private String customerInvoiceRef;
    private Kind kind;
    private Business business;

    private Company seller;
    private Company buyer;

    @FixedPrecision(2)
    private BigDecimal grossAmount;
    @FixedPrecision(2)
    private BigDecimal netAmount;


    public Invoice addStatusChange(Status previous, User user, String comment) {
        UserInfo userInfo = new UserInfo()
                .setUserRef(user.getKey())
                .setName(user.getName())
                .setEmail(user.getEmail());
        StatusChange statusChange = new StatusChange()
                .setFrom(previous)
                .setTo(status)
                .setBy(userInfo)
                .setComment(comment)
                .setTimestamp(DateTime.now());
        statusChanges.add(statusChange);
        return this;
    }

    public Invoice addAttachments(List<Blob> newAttachements) {
        if (this.attachments == null) {
            this.attachments = Lists.newLinkedList();
        }
        this.attachments.addAll(newAttachements);
        return this;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "key='" + key + '\'' +
                ", reference='" + reference + '\'' +
                ", date=" + date +
                ", dueDate=" + dueDate +
                ", status=" + status +
                ", withVAT=" + withVAT +
                ", object='" + object + '\'' +
                ", comment='" + comment + '\'' +
                ", customerInvoiceRef='" + customerInvoiceRef + '\'' +
                ", kind=" + kind +
                ", seller=" + seller +
                ", buyer=" + buyer +
                ", grossAmount=" + grossAmount +
                ", vats=" + vats +
                ", netAmount=" + netAmount +
                ", vatsAmount=" + vatsAmount +
                ", business=" + business +
                ", lines=" + lines +
                ", activities=" + activities +
                ", attachments=" + attachments +
                '}';
    }


    @Override
    public String getBusinessKey() {
        return getReference();
    }

    @Override
    public String getKey() {
        return key;
    }

    public Invoice setKey(String key) {
        this.key = key;
        return this;
    }

    public DateTime getDate() {
        return date;
    }

    public Invoice setDate(DateTime date) {
        this.date = date;
        return this;
    }

    public DateTime getDueDate() {
        return dueDate;
    }

    public Invoice setDueDate(DateTime dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public DateTime getSentDate() {
        return sentDate;
    }

    public Invoice setSentDate(DateTime sentDate) {
        this.sentDate = sentDate;
        return this;
    }

    public Status getStatus() {
        return status;
    }

    public Invoice setStatus(Status status) {
        this.status = status;
        return this;
    }

    public boolean isWithVAT() {
        return withVAT;
    }

    public Invoice setWithVAT(boolean withVAT) {
        this.withVAT = withVAT;
        return this;
    }

    public List<VATVal> getVats() {
        return vats;
    }

    public Invoice setVats(List<VATVal> vats) {
        this.vats = vats;
        return this;
    }

    public List<VATAmount> getVatsAmount() {
        return vatsAmount;
    }

    public Invoice setVatsAmount(List<VATAmount> vatsAmount) {
        this.vatsAmount = vatsAmount;
        return this;
    }

    public List<Line> getLines() {
        return lines;
    }

    public Invoice setLines(List<Line> lines) {
        this.lines = lines;
        return this;
    }

    public List<ActivityValue> getActivities() {
        return activities;
    }

    public Invoice setActivities(List<ActivityValue> activities) {
        this.activities = activities;
        return this;
    }

    public List<Blob> getAttachments() {
        return attachments;
    }

    public Invoice setAttachments(List<Blob> attachments) {
        this.attachments = attachments;
        return this;
    }

    public List<StatusChange> getStatusChanges() {
        return statusChanges;
    }

    public Invoice setStatusChanges(List<StatusChange> statusChanges) {
        this.statusChanges = statusChanges;
        return this;
    }

    public String getReference() {
        return reference;
    }

    public Invoice setReference(String reference) {
        this.reference = reference;
        return this;
    }

    public String getObject() {
        return object;
    }

    public Invoice setObject(String object) {
        this.object = object;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public Invoice setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public String getCustomerInvoiceRef() {
        return customerInvoiceRef;
    }

    public Invoice setCustomerInvoiceRef(String customerInvoiceRef) {
        this.customerInvoiceRef = customerInvoiceRef;
        return this;
    }

    public Kind getKind() {
        return kind;
    }

    public Invoice setKind(Kind kind) {
        this.kind = kind;
        return this;
    }

    public Business getBusiness() {
        return business;
    }

    public Invoice setBusiness(Business business) {
        this.business = business;
        return this;
    }

    public Company getSeller() {
        return seller;
    }

    public Invoice setSeller(Company seller) {
        this.seller = seller;
        return this;
    }

    public Company getBuyer() {
        return buyer;
    }

    public Invoice setBuyer(Company buyer) {
        this.buyer = buyer;
        return this;
    }

    public BigDecimal getGrossAmount() {
        return grossAmount;
    }

    public Invoice setGrossAmount(BigDecimal grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }

    public BigDecimal getNetAmount() {
        return netAmount;
    }

    public Invoice setNetAmount(BigDecimal netAmount) {
        this.netAmount = netAmount;
        return this;
    }

    public InvoiceView toInvoiceView(Messages messages, Locale locale) {
        return new InvoiceView(this, messages, locale);
    }

    public static class InvoiceView {

        DateFormat dateFormat = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.FRANCE);

        private String key;

        private String date;
        private String dueDate;

        private boolean withVAT;
        private List<VATVal.VATValView> vats = new ArrayList<>();
        private List<VATAmount.VATAmountView> vatsAmount = new ArrayList<>();
        private List<Line.LineView> lines = new ArrayList<>();

        private String reference;
        private String object;
        private String kind;
        private Business business;

        private Company.CompanyView seller;
        private Company.CompanyView buyer;

        @FixedPrecision(2)
        private BigDecimal grossAmount;
        @FixedPrecision(2)
        private BigDecimal netAmount;

        public InvoiceView(Invoice invoice, Messages messages, Locale locale) {
            this.key = invoice.getKey();
            this.date = (invoice.date == null) ? "" : dateFormat.format(invoice.date.toDate());
            this.dueDate = (invoice.dueDate == null) ? "" : dateFormat.format(invoice.dueDate.toDate());
            this.withVAT = invoice.withVAT;
            for (VATVal vat : invoice.vats) {
                this.vats.add(vat.toVatView());
            }
            for (VATAmount vat : invoice.vatsAmount) {
                this.vatsAmount.add(vat.toVatAmountView());
            }
            for (Line line : invoice.lines) {
                this.lines.add(line.toLineView());
            }
            this.reference = invoice.reference;
            this.object = invoice.object;
            this.kind = messages.getMessage("invoice.kind." + invoice.kind.name(), locale);
            this.business = invoice.business;
            this.seller = invoice.seller.toCompanyView();
            this.buyer = invoice.buyer.toCompanyView();
        }

        @Override
        public String toString() {
            return "InvoiceView{" +
                    "dateFormat=" + dateFormat +
                    ", key='" + key + '\'' +
                    ", date='" + date + '\'' +
                    ", dueDate='" + dueDate + '\'' +
                    ", withVAT=" + withVAT +
                    ", vats=" + vats +
                    ", vatsAmount=" + vatsAmount +
                    ", lines=" + lines +
                    ", reference='" + reference + '\'' +
                    ", object='" + object + '\'' +
                    ", kind=" + kind +
                    ", business=" + business +
                    ", seller=" + seller +
                    ", buyer=" + buyer +
                    ", grossAmount=" + grossAmount +
                    ", netAmount=" + netAmount +
                    '}';
        }

        public DateFormat getDateFormat() {
            return dateFormat;
        }

        public InvoiceView setDateFormat(DateFormat dateFormat) {
            this.dateFormat = dateFormat;
            return this;
        }

        public String getKey() {
            return key;
        }

        public InvoiceView setKey(String key) {
            this.key = key;
            return this;
        }

        public String getDate() {
            return date;
        }

        public InvoiceView setDate(String date) {
            this.date = date;
            return this;
        }

        public String getDueDate() {
            return dueDate;
        }

        public InvoiceView setDueDate(String dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public boolean isWithVAT() {
            return withVAT;
        }

        public InvoiceView setWithVAT(boolean withVAT) {
            this.withVAT = withVAT;
            return this;
        }

        public List<VATVal.VATValView> getVats() {
            return vats;
        }

        public InvoiceView setVats(List<VATVal.VATValView> vats) {
            this.vats = vats;
            return this;
        }

        public List<VATAmount.VATAmountView> getVatsAmount() {
            return vatsAmount;
        }

        public InvoiceView setVatsAmount(List<VATAmount.VATAmountView> vatsAmount) {
            this.vatsAmount = vatsAmount;
            return this;
        }

        public List<Line.LineView> getLines() {
            return lines;
        }

        public InvoiceView setLines(List<Line.LineView> lines) {
            this.lines = lines;
            return this;
        }

        public String getReference() {
            return reference;
        }

        public InvoiceView setReference(String reference) {
            this.reference = reference;
            return this;
        }

        public String getObject() {
            return object;
        }

        public InvoiceView setObject(String object) {
            this.object = object;
            return this;
        }

        public String getKind() {
            return kind;
        }

        public InvoiceView setKind(String kind) {
            this.kind = kind;
            return this;
        }

        public Business getBusiness() {
            return business;
        }

        public InvoiceView setBusiness(Business business) {
            this.business = business;
            return this;
        }

        public Company.CompanyView getSeller() {
            return seller;
        }

        public InvoiceView setSeller(Company.CompanyView seller) {
            this.seller = seller;
            return this;
        }

        public Company.CompanyView getBuyer() {
            return buyer;
        }

        public InvoiceView setBuyer(Company.CompanyView buyer) {
            this.buyer = buyer;
            return this;
        }

        public BigDecimal getGrossAmount() {
            return grossAmount;
        }

        public InvoiceView setGrossAmount(BigDecimal grossAmount) {
            this.grossAmount = grossAmount;
            return this;
        }

        public BigDecimal getNetAmount() {
            return netAmount;
        }

        public InvoiceView setNetAmount(BigDecimal netAmount) {
            this.netAmount = netAmount;
            return this;
        }
    }
}
