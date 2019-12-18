package rxinvoice.domain.print;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class PrintUtils {

    public static final NumberFormat NUMBER_FORMAT;

    static {
        NUMBER_FORMAT = DecimalFormat.getInstance(Locale.FRANCE);
        NUMBER_FORMAT.setMinimumFractionDigits(2);
    }

    public static final DateFormat DATE_FORMAT = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.FRANCE);
}
