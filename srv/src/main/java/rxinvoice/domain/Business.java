package rxinvoice.domain;

public class Business {
        private String reference;
        private String name;

        public String getReference() {
            return reference;
        }

        public Business setReference(String reference) {
            this.reference = reference;
            return this;
        }

        public String getName() {
            return name;
        }

        public Business setName(String name) {
            this.name = name;
            return this;
        }


        @Override
        public String toString() {
            return "Business{" +
                    "reference='" + reference + '\'' +
                    ", name='" + name + '\'' +
                    '}';
        }
    }