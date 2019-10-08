package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;

import java.math.BigDecimal;

public class InvoiceInfo {
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