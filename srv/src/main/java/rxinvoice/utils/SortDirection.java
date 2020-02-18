package rxinvoice.utils;

public enum SortDirection {
    ASC(1),
    DESC(-1);

    private int asInt;

    private SortDirection(int asInt) {
        this.asInt = asInt;
    }

    public int getAsInt() {
        return asInt;
    }

    @Override
    public String toString() {
        return "SortOrder{" +
                "asInt=" + asInt +
                "} " + super.toString();
    }
}
