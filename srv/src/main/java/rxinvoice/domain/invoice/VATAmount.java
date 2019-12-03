package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.VATAmountPrint;

import java.math.BigDecimal;

public class VATAmount {

    private String vat;
    @FixedPrecision(2)
    private BigDecimal amount;

    public VATAmountPrint toVatAmountView() {
        return new VATAmountPrint(this);
    }

    @Override
    public String toString() {
        return "VATAmount{" +
                "vat='" + vat + '\'' +
                ", amount=" + amount +
                '}';
    }

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

}