package rxinvoice.jongo;

import java.util.regex.Pattern;

public class MoreJongos {
    public static Pattern containsIgnoreCase(String expr) {
        return Pattern.compile(String.format(".*\\Q%s\\E.*", expr), Pattern.CASE_INSENSITIVE);
    }
}
