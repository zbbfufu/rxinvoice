package rxinvoice.service;


import java.util.Optional;

public class InvoiceSearchFilter {

    private Optional<String> startDate = Optional.empty();
    private Optional<String> endDate = Optional.empty();
    private Optional<String> statuses = Optional.empty();
    private Optional<String> buyerRef = Optional.empty();
    private Optional<String> kind = Optional.empty();
    private Optional<String> query = Optional.empty();
    private Optional<String> reference = Optional.empty();

    @Override
    public String toString() {
        return "InvoiceSearchFilter{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                ", statuses=" + statuses +
                ", buyerRef=" + buyerRef +
                ", kind=" + kind +
                ", query=" + query +
                ", reference=" + reference +
                '}';
    }

    public Optional<String> getStartDate() {
        return startDate;
    }

    public InvoiceSearchFilter setStartDate(Optional<String> startDate) {
        this.startDate = startDate;
        return this;
    }

    public Optional<String> getEndDate() {
        return endDate;
    }

    public InvoiceSearchFilter setEndDate(Optional<String> endDate) {
        this.endDate = endDate;
        return this;
    }

    public Optional<String> getStatuses() {
        return statuses;
    }

    public InvoiceSearchFilter setStatuses(Optional<String> statuses) {
        this.statuses = statuses;
        return this;
    }

    public Optional<String> getBuyerRef() {
        return buyerRef;
    }

    public InvoiceSearchFilter setBuyerRef(Optional<String> buyerRef) {
        this.buyerRef = buyerRef;
        return this;
    }

    public Optional<String> getKind() {
        return kind;
    }

    public InvoiceSearchFilter setKind(Optional<String> kind) {
        this.kind = kind;
        return this;
    }

    public Optional<String> getQuery() {
        return query;
    }

    public InvoiceSearchFilter setQuery(Optional<String> query) {
        this.query = query;
        return this;
    }

    public Optional<String> getReference() {
        return reference;
    }

    public InvoiceSearchFilter setReference(Optional<String> reference) {
        this.reference = reference;
        return this;
    }
}
