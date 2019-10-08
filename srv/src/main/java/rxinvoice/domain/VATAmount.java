package rxinvoice.domain;

import restx.jackson.FixedPrecision;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class VATAmount {

    private String vat;
    @FixedPrecision(2)
    private BigDecimal amount;

    public VATAmountView toVatAmountView() {
        return new VATAmountView(this);
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


    public static class VATAmountView {
        private String vat;
        private String amount;

        public VATAmountView(VATAmount vatAmount) {
            this.vat = vatAmount.vat;
            this.amount = ((vatAmount.amount == null) ? BigDecimal.ZERO : vatAmount.amount)
                    .setScale(2, RoundingMode.HALF_EVEN).toString();
        }

        @Override
        public String toString() {
            return "VATAmountView{" +
                    "vat='" + vat + '\'' +
                    ", amount='" + amount + '\'' +
                    '}';
        }

        public String getVat() {
            return vat;
        }

        public VATAmountView setVat(String vat) {
            this.vat = vat;
            return this;
        }

        public String getAmount() {
            return amount;
        }

        public VATAmountView setAmount(String amount) {
            this.amount = amount;
            return this;
        }
    }

}