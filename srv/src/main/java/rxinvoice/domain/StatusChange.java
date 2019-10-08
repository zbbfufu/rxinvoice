package rxinvoice.domain;

import org.joda.time.DateTime;
import rxinvoice.domain.invoice.Status;

public class StatusChange {

    private Status from;
    private Status to;
    private UserInfo by;
    private String comment;
    private DateTime timestamp;

    @Override
    public String toString() {
        return "StatusChange{" +
                "from='" + from + '\'' +
                ", to=" + to +
                ", by=" + by +
                ", comment=" + comment +
                ", timestamp=" + timestamp +
                '}';
    }

    public Status getFrom() {
        return from;
    }

    public StatusChange setFrom(Status from) {
        this.from = from;
        return this;
    }

    public Status getTo() {
        return to;
    }

    public StatusChange setTo(Status to) {
        this.to = to;
        return this;
    }

    public UserInfo getBy() {
        return by;
    }

    public StatusChange setBy(UserInfo by) {
        this.by = by;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public StatusChange setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public DateTime getTimestamp() {
        return timestamp;
    }

    public StatusChange setTimestamp(DateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }


}