package rxinvoice.domain;

import com.google.common.base.Objects;
import org.joda.time.DateTime;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;

public class Activity {
    @Id @ObjectId
    private String key;

    private String objectType;
    private String objectKey;
    private String objectBusinessKey;

    private Type type;

    private UserInfo userInfo;

    private DateTime timestamp;

    Activity() {
    }

    public static Activity newCreate(Auditable object, User user) {
        return of(object, Type.CREATE, user);
    }

    public static Activity newUpdate(Auditable object, User user) {
        return of(object, Type.UPDATE, user);
    }

    public static Activity newDelete(Auditable object, User user) {
        return of(object, Type.DELETE, user);
    }

    private static Activity of(Auditable object, Type type, User user) {
        Activity activity = new Activity();
        activity.objectType = object.getClass().getSimpleName();
        activity.objectKey = object.getKey();
        activity.objectBusinessKey = object.getBusinessKey();
        activity.type = type;
        activity.userInfo = new UserInfo(user);
        activity.timestamp = DateTime.now();

        return activity;
    }

    public String getKey() {
        return key;
    }

    public Activity setKey(String key) {
        this.key = key;
        return this;
    }

    public String getObjectType() {
        return objectType;
    }

    public Activity setObjectType(String objectType) {
        this.objectType = objectType;
        return this;
    }

    public String getObjectKey() {
        return objectKey;
    }

    public Activity setObjectKey(String objectKey) {
        this.objectKey = objectKey;
        return this;
    }

    public String getObjectBusinessKey() {
        return objectBusinessKey;
    }

    public Activity setObjectBusinessKey(String objectBusinessKey) {
        this.objectBusinessKey = objectBusinessKey;
        return this;
    }

    public Type getType() {
        return type;
    }

    public Activity setType(Type type) {
        this.type = type;
        return this;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public Activity setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
        return this;
    }

    public DateTime getTimestamp() {
        return timestamp;
    }

    public Activity setTimestamp(DateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("key", key)
                .add("objectType", objectType)
                .add("objectKey", objectKey)
                .add("objectBusinessKey", objectBusinessKey)
                .add("type", type)
                .add("userInfo", userInfo)
                .add("timestamp", timestamp)
                .toString();
    }

    public static class UserInfo {
        private String ref;
        private String name;

        public UserInfo() {
        }

        public UserInfo(User user) {
            this(user.getKey(), user.getName());
        }

        private UserInfo(String ref, String name) {
            this.ref = ref;
            this.name = name;
        }

        public String getRef() {
            return ref;
        }

        public String getName() {
            return name;
        }

        @Override
        public String toString() {
            return Objects.toStringHelper(this)
                    .add("ref", ref)
                    .add("name", name)
                    .toString();
        }
    }

    public enum Type {
        CREATE, UPDATE, DELETE
    }
}
