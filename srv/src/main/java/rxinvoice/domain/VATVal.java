package rxinvoice.domain;

import restx.jackson.FixedPrecision;

import java.math.BigDecimal;

public class VATVal {
    private String vat;

    @FixedPrecision(2)
    private BigDecimal amount;

    public String getVat() {
        return vat;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public VATVal setVat(final String vat) {
        this.vat = vat;
        return this;
    }

    public VATVal setAmount(final BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    @Override
    public String toString() {
        return "VATVal{" +
                "vat=" + vat +
                ", amount=" + amount +
                '}';
    }

    public VATValView toVatView() {
        return new VATValView(this);
    }

    public static class VATValView {
        private String vat;
        private String amount;


        public VATValView(VATVal vatVal) {
            this.vat = vatVal.vat;
            this.amount = (vatVal.amount == null) ? "0.00" :  vatVal.amount.setScale(2).toString();
        }

        @Override
        public String toString() {
            return "VATValView{" +
                    "vat='" + vat + '\'' +
                    ", amount='" + amount + '\'' +
                    '}';
        }

        public String getVat() {
            return vat;
        }

        public VATValView setVat(String vat) {
            this.vat = vat;
            return this;
        }
    }
}