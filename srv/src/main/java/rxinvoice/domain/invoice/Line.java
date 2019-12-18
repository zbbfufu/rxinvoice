package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.InvoiceLinePrint;

import java.math.BigDecimal;

public class Line {

    private String description;
    private VATVal vat;

    @FixedPrecision(2)
    private BigDecimal quantity;

    @FixedPrecision(2)
    private BigDecimal unitCost;

    @FixedPrecision(2)
    private BigDecimal grossAmount;

    public InvoiceLinePrint toInvoiceLinePrint() {
        return new InvoiceLinePrint(this);
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
}