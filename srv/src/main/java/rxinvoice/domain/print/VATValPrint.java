package rxinvoice.domain.print;

import rxinvoice.domain.invoice.VATVal;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class VATValPrint {
    private String vat;
    private String amount;


    public VATValPrint(VATVal vatVal) {
        this.vat = vatVal.getVat();
        this.amount = PrintUtils.NUMBER_FORMAT.format((vatVal.getAmount() == null)
                ? BigDecimal.ZERO
                : vatVal.getAmount().setScale(2, RoundingMode.HALF_EVEN));
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

    public VATValPrint setVat(String vat) {
        this.vat = vat;
        return this;
    }
}