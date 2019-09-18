package rxinvoice.utils;

import java.util.Optional;

public class OptionalUtils {

    public static <T> Optional<T> convertToJ8Optional(com.google.common.base.Optional<T> optional) {
        if (optional.isPresent()) {
            return Optional.of(optional.get());
        }
        return Optional.empty();
    }

    public static <T> com.google.common.base.Optional<T> convertFromJ8Optional(Optional<T> optional) {
        if (optional.isPresent()) {
            return com.google.common.base.Optional.of(optional.get());
        }
        return com.google.common.base.Optional.absent();
    }
}
