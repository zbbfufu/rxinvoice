package rxinvoice.utils;

public class SortProperty {

    private final String name;
    private final SortDirection direction;

    public SortProperty(String name, SortDirection direction) {
        this.name = name;
        this.direction = direction;
    }

    public SortDirection getDirection() {
        return direction;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "SortProperty{" +
                "direction=" + direction +
                ", name='" + name + '\'' +
                '}';
    }
}
