package rxinvoice.domain.invoice;

public enum Status {
    DRAFT,
    READY,
    SENT,
    LATE,
    PAID,
    CANCELLED,
    WAITING_VALIDATION,
    VALIDATED,
    UNPAID,
    PAYMENT_SCHEDULED
}
