package rxinvoice.domain;

public class UserInfo {

    private String userRef;
    private String name;
    private String email;

    @Override
    public String toString() {
        return "UserInfo{" +
                "userRef='" + userRef + '\'' +
                ", name=" + name +
                ", email=" + email +
                '}';
    }

    public String getUserRef() {
        return userRef;
    }

    public UserInfo setUserRef(String userRef) {
        this.userRef = userRef;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserInfo setName(String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserInfo setEmail(String email) {
        this.email = email;
        return this;
    }

}