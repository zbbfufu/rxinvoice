package rxinvoice.domain.company;

import org.joda.time.LocalDate;

public class FiscalYear {
        private LocalDate start;
        private LocalDate end;

        public static final FiscalYear DEFAULT = new FiscalYear()
                .setStart(firstDayOfYear())
                .setEnd(lastDayOfYear())
                .current();

        public LocalDate getStart() {
            return start;
        }

        public FiscalYear setStart(LocalDate start) {
            this.start = start;
            return this;
        }

        public LocalDate getEnd() {
            return end;
        }

        public FiscalYear setEnd(LocalDate end) {
            this.end = end;
            return this;
        }

        private static LocalDate firstDayOfYear() {
            return LocalDate.now().withMonthOfYear(1).withDayOfMonth(1);
        }

        private static LocalDate lastDayOfYear() {
            return LocalDate.now().withMonthOfYear(12).withDayOfMonth(31);
        }

        public FiscalYear current() {
            LocalDate start = this.start.withYear(LocalDate.now().getYear());
            LocalDate end = this.end.withYear(LocalDate.now().getYear());

            if (LocalDate.now().isBefore(start)) {
                start = start.minusYears(1);
            }

            if (LocalDate.now().isAfter(end)) {
                end = end.plusYears(1);
            }

            return new FiscalYear()
                    .setStart(start)
                    .setEnd(end);
        }

        public FiscalYear previous() {
            return new FiscalYear()
                    .setStart(start.minusYears(1))
                    .setEnd(end.minusYears(1));
        }

        public FiscalYear next() {
            return new FiscalYear()
                    .setStart(start.plusYears(1))
                    .setEnd(end.plusYears(1));
        }
      
        @Override
        public String toString() {
            return "FiscalYear{" +
                    "start=" + start +
                    ", end=" + end +
                    '}';
        }
    }