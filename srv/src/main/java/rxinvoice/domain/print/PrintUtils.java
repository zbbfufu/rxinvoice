package rxinvoice.domain.print;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Currency;
import java.util.Locale;

public class PrintUtils {

    public static final NumberFormat NUMBER_FORMAT;

    static {
        NUMBER_FORMAT = DecimalFormat.getCurrencyInstance(Locale.FRANCE);
        NUMBER_FORMAT.setMinimumFractionDigits(2);
        NUMBER_FORMAT.setCurrency(Currency.getInstance("EUR"));
    }

    public static final DateFormat DATE_FORMAT = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.FRANCE);
}
