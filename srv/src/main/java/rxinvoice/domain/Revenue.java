package rxinvoice.domain;

import org.joda.time.DateTime;
import restx.jackson.FixedPrecision;

import java.math.BigDecimal;

public class Revenue {
    private DateTime from;
    private DateTime to;
    private PeriodType periodType;
    @FixedPrecision(2)
    private BigDecimal invoiced = BigDecimal.ZERO;
    @FixedPrecision(2)
    private BigDecimal paid = BigDecimal.ZERO;

    public DateTime getFrom() {
        return from;
    }

    public Revenue setFrom(DateTime from) {
        this.from = from;
        return this;
    }

    public DateTime getTo() {
        return to;
    }

    public Revenue setTo(DateTime to) {
        this.to = to;
        return this;
    }

    public PeriodType getPeriodType() {
        return periodType;
    }

    public Revenue setPeriodType(PeriodType periodType) {
        this.periodType = periodType;
        return this;
    }

    public BigDecimal getInvoiced() {
        return invoiced;
    }

    public Revenue setInvoiced(BigDecimal invoiced) {
        this.invoiced = invoiced;
        return this;
    }

    public BigDecimal getPaid() {
        return paid;
    }

    public Revenue setPaid(BigDecimal paid) {
        this.paid = paid;
        return this;
    }

    @Override
    public String toString() {
        return "Revenue{" +
                "from=" + from +
                "to=" + to +
                "periodType=" + periodType +
                "invoiced=" + invoiced +
                ", paid=" + paid +
                '}';
    }

    public enum PeriodType {
        MONTHLY, YEARLY
    }
}
