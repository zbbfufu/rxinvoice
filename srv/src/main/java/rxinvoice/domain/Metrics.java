package rxinvoice.domain;

import restx.jackson.FixedPrecision;

import java.math.BigDecimal;

public class Metrics {
    private int nbInvoices;

    @FixedPrecision(2)
    private BigDecimal expected;
    @FixedPrecision(2)
    private BigDecimal expired;
    @FixedPrecision(2)
    private BigDecimal invoiced;
    @FixedPrecision(2)
    private BigDecimal cancelled;
    @FixedPrecision(2)
    private BigDecimal paid;


    public int getNbInvoices() {
        return nbInvoices;
    }

    public void setNbInvoices(int nbInvoices) {
        this.nbInvoices = nbInvoices;
    }

    public BigDecimal getExpected() {
        return expected;
    }

    public void setExpected(BigDecimal expected) {
        this.expected = expected;
    }

    public BigDecimal getExpired() {
        return expired;
    }

    public void setExpired(BigDecimal expired) {
        this.expired = expired;
    }

    public BigDecimal getInvoiced() {
        return invoiced;
    }

    public void setInvoiced(BigDecimal invoiced) {
        this.invoiced = invoiced;
    }

    public BigDecimal getPaid() {
        return paid;
    }

    public void setPaid(BigDecimal paid) {
        this.paid = paid;
    }

    public BigDecimal getCancelled() {
        return cancelled;
    }

    public Metrics setCancelled(BigDecimal cancelled) {
        this.cancelled = cancelled;
        return this;
    }

    @Override
    public String toString() {
        return "Metrics{" +
                "nbInvoices=" + nbInvoices +
                ", expected=" + expected +
                ", expired=" + expired +
                ", invoiced=" + invoiced +
                ", paid=" + paid +
                '}';
    }
}
