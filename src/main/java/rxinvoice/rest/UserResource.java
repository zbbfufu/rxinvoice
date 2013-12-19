package rxinvoice.rest;

import com.google.common.base.Optional;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.mindrot.jbcrypt.BCrypt;
import restx.exceptions.RestxErrors;
import restx.http.HttpStatus;
import restx.Status;
import restx.WebException;
import restx.annotations.*;
import restx.exceptions.RestxError;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.security.RolesAllowed;
import restx.security.UserRepository;
import rxinvoice.AppModule;
import rxinvoice.domain.User;
import rxinvoice.domain.UserCredentials;

import javax.inject.Named;
import java.util.Arrays;
import java.util.Map;

import static com.google.common.base.Preconditions.checkNotNull;
import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.*;

/**
 */
@Component @RestxResource
public class UserResource implements UserRepository<User> {
    public static final User defaultAdminUser = new User()
            .setKey(new ObjectId().toString())
            .setName("admin")
            .setRoles(Arrays.asList(ADMIN, "restx-admin"));

    private final JongoCollection users;
    private final JongoCollection usersCredentials;
    private final RestxErrors errors;
    private final CompanyResource companyResource;

    public UserResource(@Named("users") JongoCollection users,
                        @Named("usersCredentials") JongoCollection usersCredentials,
                        RestxErrors errors,
                        CompanyResource companyResource) {
        this.users = users;
        this.usersCredentials = usersCredentials;
        this.errors = errors;
        this.companyResource = companyResource;
    }

    @RolesAllowed(ADMIN)
    @POST("/users")
    public User createUser(User user) {
        checkUserRules(user);
        users.get().save(user);
        return user;
    }

    @PUT("/users/{key}")
    public User updateUser(String key, User user) {
        checkEquals("key", key, "user.key", user.getKey());
        checkSelfOrAdmin(key);
        checkUserRules(user);
        users.get().save(user);
        return user;
    }

    @RolesAllowed(ADMIN)
    @GET("/users")
    public Iterable<User> findUsers() {
        return users.get().find().as(User.class);
    }

    @GET("/users/{key}")
    public Optional<User> findUserByKey(String key) {
        checkSelfOrAdmin(key);
        return Optional.fromNullable(users.get().findOne(new ObjectId(key)).as(User.class));
    }

    public Optional<User> findUserByName(String name) {
        return Optional.fromNullable(users.get().findOne("{name: #}", name).as(User.class));
    }

    @Override
    public Optional<String> findCredentialByUserName(String name) {
        Optional<User> userByName = findUserByName(name);
        if (!userByName.isPresent()) {
            return Optional.absent();
        }
        UserCredentials c = findCredentialsForUserKey(userByName.get().getKey());
        if (c == null) {
            return Optional.absent();
        }

        return Optional.fromNullable(c.getPasswordHash());
    }

    @RolesAllowed(ADMIN)
    @DELETE("/users/{key}")
    public void deleteUser(String key) {
        ObjectId id = new ObjectId(key);
        users.get().remove(id);
        usersCredentials.get().remove("{ userRef: # }", id);
    }

    @PUT("/users/{userKey}/credentials")
    public Status setCredentials(String userKey, Map newCredentials) {
        String passwordHash = (String) newCredentials.get("passwordHash");
        checkNotNull(passwordHash, "new credentials must have a passwordHash property");

        checkSelfOrAdmin(userKey);

        UserCredentials userCredentials = findCredentialsForUserKey(userKey);

        if (userCredentials == null) {
            userCredentials = new UserCredentials().setUserRef(userKey);
        }
        String hashed = BCrypt.hashpw(passwordHash, BCrypt.gensalt());
        usersCredentials.get().save(
                userCredentials
                        .setPasswordHash(hashed)
                        .setLastUpdated(DateTime.now()));

        return Status.of("updated");
    }

    private void checkUserRules(User user) {
        if (user.getPrincipalRoles().contains(SELLER) || user.getPrincipalRoles().contains(BUYER)) {
            if (user.getCompanyRef() == null) {
                throw errors.on(User.Rules.CompanyRef.class)
                        .set(User.Rules.CompanyRef.KEY, user.getKey())
                        .raise();
            }
            if (!companyResource.findCompanyByKey(user.getCompanyRef()).isPresent()) {
                throw errors.on(User.Rules.ValidCompanyRef.class)
                        .set(User.Rules.ValidCompanyRef.KEY, user.getKey())
                        .set(User.Rules.ValidCompanyRef.COMPANY_REF, user.getCompanyRef())
                        .raise();
            }
        }
    }

    public static void checkSelfOrAdmin(String userKey) {
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)
                && !user.getKey().equals(userKey)) {
            throw new WebException(HttpStatus.FORBIDDEN);
        }
    }

    private UserCredentials findCredentialsForUserKey(String userKey) {
        return usersCredentials.get()
                .findOne("{ userRef: # }", new ObjectId(userKey)).as(UserCredentials.class);
    }

    @Override
    public boolean isAdminDefined() {
        try {
            return users.get().count("{roles: {$all: [ # ]}}", ADMIN) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public User defaultAdmin() {
        return defaultAdminUser;
    }
}