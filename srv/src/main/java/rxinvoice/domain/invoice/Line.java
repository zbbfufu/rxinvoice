package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.VATValPrint;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Line {

    private String description;
    private VATVal vat;

    @FixedPrecision(2)
    private BigDecimal quantity;

    @FixedPrecision(2)
    private BigDecimal unitCost;

    @FixedPrecision(2)
    private BigDecimal grossAmount;

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


    public LineView toLineView() {
        return new LineView(this);
    }

    public static class LineView {
        private String description;
        private VATValPrint vat;

        private String quantity;
        private String unitCost;
        private String grossAmount;

        public LineView(Line line) {
            this.description = line.description;
            this.vat = line.vat == null ? null : line.vat.toVatView();
            this.quantity = (line.quantity == null ? BigDecimal.ZERO : line.quantity)
                    .setScale(2, RoundingMode.HALF_EVEN).toString();
            this.unitCost = (line.unitCost == null ? BigDecimal.ZERO : line.unitCost)
                    .setScale(2, RoundingMode.HALF_EVEN).toString();
            this.grossAmount = (line.grossAmount == null ? ""
                    : line.grossAmount.setScale(2, RoundingMode.HALF_EVEN).toString());
        }

        @Override
        public String toString() {
            return "LineView{" +
                    "description='" + description + '\'' +
                    ", vat=" + vat +
                    ", quantity='" + quantity + '\'' +
                    ", unitCost='" + unitCost + '\'' +
                    ", grossAmount='" + grossAmount + '\'' +
                    '}';
        }

        public String getDescription() {
            return description;
        }

        public LineView setDescription(String description) {
            this.description = description;
            return this;
        }

        public VATValPrint getVat() {
            return vat;
        }

        public LineView setVat(VATValPrint vat) {
            this.vat = vat;
            return this;
        }

        public String getQuantity() {
            return quantity;
        }

        public LineView setQuantity(String quantity) {
            this.quantity = quantity;
            return this;
        }

        public String getUnitCost() {
            return unitCost;
        }

        public LineView setUnitCost(String unitCost) {
            this.unitCost = unitCost;
            return this;
        }

        public String getGrossAmount() {
            return grossAmount;
        }

        public LineView setGrossAmount(String grossAmount) {
            this.grossAmount = grossAmount;
            return this;
        }
    }
}