package rxinvoice.domain.invoice;

public enum Status {


    DRAFT(0),
    READY(1),
    WAITING_VALIDATION(2),
    VALIDATED(3),
    SENT(4),
    PAID(5),
    PAYMENT_SCHEDULED(6),
    LATE(7),
    UNPAID(8),
    CANCELLED(9);


    private final int rank;

    Status(int rank) {
        this.rank = rank;
    }

    public int getRank() {
        return rank;
    }
}
