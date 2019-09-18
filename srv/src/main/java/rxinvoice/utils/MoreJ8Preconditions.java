package rxinvoice.utils;


import java.util.Optional;


public class MoreJ8Preconditions {

    public static <T> T checkPresent(Optional<T> optional, String msg, Object... parameters) {
        return restx.common.MorePreconditions.checkPresent(OptionalUtils.convertFromJ8Optional(optional), msg, parameters);
    }
}
