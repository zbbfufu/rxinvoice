package rxinvoice.domain.print;

import rxinvoice.domain.invoice.VATVal;

public class VATValPrint {
    private String vat;
    private String amount;


    public VATValPrint(VATVal vatVal) {
        this.vat = vatVal.getVat();
        this.amount = (vatVal.getAmount() == null) ? "0.00" : vatVal.getAmount().setScale(2).toString();
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