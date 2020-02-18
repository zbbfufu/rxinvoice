package rxinvoice.utils;

import com.google.common.collect.Lists;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortCriteriaUtil {

    private static final Logger logger = LoggerFactory.getLogger(SortCriteriaUtil.class);

    private static final String PROPERTY_SEPARATOR = ";";
    private static final String SORT_ORDER_SEPARATOR = "_";


    public static String buildMongoSortQuery(List<SortProperty> sortProperties) {
        StringBuilder query = new StringBuilder("{");
        sortProperties.forEach(sortProperty ->
                {
                    if (query.length() > 1) {
                        query.append(",");
                    }
                    query.append(sortProperty.getName()).append(":").append(sortProperty.getDirection().getAsInt());

                }
        );

        query.append("}");
        return query.toString();
    }

    public static List<SortProperty> buildSortProperties(String sortQueryParams) {
        if (null == sortQueryParams) {
            return Collections.emptyList();
        }

        final List<SortProperty> sortProperties = Lists.newArrayList();
        final String[] properties = sortQueryParams.split(PROPERTY_SEPARATOR);
        Arrays.asList(properties).forEach(property -> {
            final String[] split = property.split(SORT_ORDER_SEPARATOR);
            if (split.length == 2) {
                sortProperties.add(new SortProperty(split[0], SortDirection.valueOf(split[1])));
            }
        });

        return sortProperties;
    }

    public static <T> void sort(List<T> list, List<SortProperty> sortProperties) {
        final Comparator<T> comparator = buildComparator(sortProperties);

        if (comparator != null) {
            try {
                list.sort(comparator);
            } catch (Exception e) {
                logger.warn("Exception occurred on sorting operation, sort criteria not applied");
            }
        }
    }

    private static <T> Comparator<T> buildComparator(List<SortProperty> sortProperties) {
        Comparator<T> comparator = null;
        for (SortProperty sortProperty : sortProperties) {
            if (comparator == null) {
                    comparator = getComparatorFromProperty(sortProperty);
            } else {
                    comparator.thenComparing(getComparatorFromProperty(sortProperty));
            }
        }
        return comparator;
    }

    private static <T> Comparator<T> getComparatorFromProperty(SortProperty sortProperty) {

        Comparator<T> comparator = Comparator.comparing(user -> {
            try {
                return BeanUtils.getProperty(user, sortProperty.getName());
            } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                logger.debug("Exception occurred on sorting operation when trying to use property {}", sortProperty, e);
                logger.warn("Exception occurred on sorting operation when trying to use property {}", sortProperty);
                throw new RuntimeException(e);
            }
        }, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER));
        if (SortDirection.DESC.equals(sortProperty.getDirection())) {
            comparator = comparator.reversed();
        }
        return comparator;
    }

}
