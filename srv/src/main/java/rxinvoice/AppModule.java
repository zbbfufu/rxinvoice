package rxinvoice;

import com.google.common.base.Charsets;
import com.google.common.base.Optional;
import com.google.common.base.Predicates;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import restx.admin.AdminModule;
import restx.i18n.SupportedLocale;
import restx.jongo.JongoCollection;
import restx.mongo.MongoModule;
import restx.security.*;
import restx.factory.Module;
import restx.factory.Provides;
import rxinvoice.domain.User;
import rxinvoice.rest.AppUserRepository;
import rxinvoice.rest.UserResource;
import rxinvoice.util.MD5;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Locale;
import java.util.regex.Pattern;

@Module
public class AppModule {


    public static final RestxPrincipal ADMIN_RESTX_PRINCIPAL = new User()
            .setName(AdminModule.RESTX_ADMIN_PRINCIPAL.getName())
            .setRoles(adminRoles());
    private static Collection<String> adminRoles() {
        Collection<String> roles = new ArrayList<String>();
        roles.addAll(AdminModule.RESTX_ADMIN_PRINCIPAL.getPrincipalRoles());
        roles.add(Roles.ADMIN);
        return roles;
    };
    public static User currentUser() {
        return (User) RestxSession.current().getPrincipal().get();
    }

    public static final class Roles {
        // we don't use an enum here because roles in @RolesAllowed have to be constant strings
        public static final String ADMIN = "admin";
        public static final String SELLER = "seller";
        public static final String BUYER = "buyer";
        public static final String CORS = "cors";
    }

    @Provides
    public SignatureKey signatureKey() {
         return new SignatureKey(
                 "rxinvoice -6496014073139514714 rxinvoice 2beab8fc-4422-46fc-8b80-4453071c3ff9"
                         .getBytes(Charsets.UTF_8));
    }

    @Provides @Named(MongoModule.MONGO_DB_NAME)
    public String dbName() {
        return "rxinvoice";
    }

    @Provides @Named("restx.app.package")
    public String appPackage() {
        return "rxinvoice";
    }

    @Provides @Named("FR")
    public SupportedLocale french() {
        return new SupportedLocale(Locale.FRENCH);
    }

    @Provides
    public CredentialsStrategy credentialsStrategy() {
        return new BCryptCredentialsStrategy();
    }

    @Provides
    public BasicPrincipalAuthenticator basicPrincipalAuthenticator(
            AppUserRepository userRepository, SecuritySettings securitySettings,
            CredentialsStrategy credentialsStrategy, @Named("users") final JongoCollection users,
            @Named("restx.admin.passwordHash") final String adminPasswordHash) {
        return new BasicPrincipalAuthenticator() {
            @Override
            public Optional<? extends RestxPrincipal> findByName(String name) {
                if ("admin".equals(name)) {
                    return Optional.of(ADMIN_RESTX_PRINCIPAL);
                }
                User user = users.get().findOne("{name: #}", name).as(User.class);
                return Optional.of(user);
            }

            @Override
            public Optional<? extends RestxPrincipal> authenticate(
                    String name, String passwordHash, ImmutableMap<String, ?> principalData) {
                if ("admin".equals(name) && adminPasswordHash.equals(passwordHash)) {
                    return Optional.of(ADMIN_RESTX_PRINCIPAL);
                }
                User user = users.get().findOne("{login: #, password: #}", name, MD5.getSaltPassword(passwordHash)).as(User.class);
                return Optional.of(user);
            }
        };
    }

    @Provides
    public CORSAuthorizer getApiDocsAuthorizer() {
        return StdCORSAuthorizer.builder()
                .setOriginMatcher(Predicates.<CharSequence>alwaysTrue())
                .setPathMatcher(Predicates.contains(Pattern.compile("^/cors")))
                .setAllowedMethods(ImmutableList.of("OPTIONS", "GET", "POST"))
                .setAllowedHeaders(ImmutableList.of("accept", "authorization"))
                .build();
    }
}
