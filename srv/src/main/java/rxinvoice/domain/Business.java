package rxinvoice.domain;

public class Business {
        private String reference;
        private String name;

        public String getReference() {
            return reference;
        }

        public void setReference(String reference) {
            this.reference = reference;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }


        @Override
        public String toString() {
            return "Business{" +
                    "reference='" + reference + '\'' +
                    ", name='" + name + '\'' +
                    '}';
        }
    }