package rxinvoice.domain;

/**
 */
public class Address {
    private String body;
    private String zipCode;
    private String city;
    private String country;

    public String getBody() {
        return body;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public Address setBody(final String body) {
        this.body = body;
        return this;
    }

    public Address setZipCode(final String zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public Address setCity(final String city) {
        this.city = city;
        return this;
    }

    public Address setCountry(final String country) {
        this.country = country;
        return this;
    }

    @Override
    public String toString() {
        return "Address{" +
                "body='" + body + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}

