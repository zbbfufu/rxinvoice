package rxinvoice.domain;

import restx.jackson.FixedPrecision;

import java.math.BigDecimal;
import rxinvoice.domain.enumeration.Activity;


public class ActivityValue {

    @FixedPrecision(2)
    private BigDecimal value;
    private Activity activity;

    @Override
    public String toString() {
        return "ActivityValue{" +
                "activity=" + activity +
                ", value=" + value +
                '}';
    }

    public Activity getActivity() {
        return activity;
    }

    public BigDecimal getValue() {
        return value;
    }

    public ActivityValue setActivity(final Activity activity) {
        this.activity = activity;
        return this;
    }

    public ActivityValue setValue(final BigDecimal value) {
        this.value = value;
        return this;
    }

}