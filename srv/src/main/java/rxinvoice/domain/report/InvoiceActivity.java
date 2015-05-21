package rxinvoice.domain.report;

import java.math.BigDecimal;
import java.util.Date;

public class InvoiceActivity {
    private String type;
    private String buyer;
    private String buyerType;
    private String business;
    private String activity;
    private String businessType;
    private String status;
    private BigDecimal grossAmount;
    private BigDecimal netAmount;
    private BigDecimal percent;
    private Date date;

    public String getType() {
        return type;
    }

    public InvoiceActivity setType(String type) {
        this.type = type;
        return this;
    }

    public String getBuyer() {
        return buyer;
    }

    public InvoiceActivity setBuyer(String buyer) {
        this.buyer = buyer;
        return this;
    }

    public String getBuyerType() {
        return buyerType;
    }

    public InvoiceActivity setBuyerType(String buyerType) {
        this.buyerType = buyerType;
        return this;
    }

    public String getBusiness() {
        return business;
    }

    public InvoiceActivity setBusiness(String business) {
        this.business = business;
        return this;
    }

    public String getActivity() {
        return activity;
    }

    public InvoiceActivity setActivity(String activity) {
        this.activity = activity;
        return this;
    }

    public String getBusinessType() {
        return businessType;
    }

    public InvoiceActivity setBusinessType(String businessType) {
        this.businessType = businessType;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public InvoiceActivity setStatus(String status) {
        this.status = status;
        return this;
    }

    public BigDecimal getGrossAmount() {
        return grossAmount;
    }

    public InvoiceActivity setGrossAmount(BigDecimal grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }

    public BigDecimal getNetAmount() {
        return netAmount;
    }

    public InvoiceActivity setNetAmount(BigDecimal netAmount) {
        this.netAmount = netAmount;
        return this;
    }

    public BigDecimal getPercent() {
        return percent;
    }

    public InvoiceActivity setPercent(BigDecimal percent) {
        this.percent = percent;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public InvoiceActivity setDate(Date date) {
        this.date = date;
        return this;
    }


    @Override
    public String toString() {
        return "InvoiceActivity{" +
                "type='" + type + '\'' +
                ", buyer='" + buyer + '\'' +
                ", buyerType='" + buyerType + '\'' +
                ", business='" + business + '\'' +
                ", activity='" + activity + '\'' +
                ", businessType='" + businessType + '\'' +
                ", status='" + status + '\'' +
                ", grossAmount=" + grossAmount +
                ", netAmount=" + netAmount +
                ", percent=" + percent +
                ", date=" + date +
                '}';
    }
}
