package rxinvoice.service;

import java.util.Optional;
import com.google.common.base.Strings;
import com.google.common.eventbus.EventBus;
import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.jongo.Distinct;
import restx.Status;
import restx.WebException;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.jongo.JongoCollection;
import rxinvoice.AppModule;
import rxinvoice.domain.Activity;
import rxinvoice.domain.Business;
import rxinvoice.domain.Company;
import rxinvoice.domain.User;
import rxinvoice.jongo.MoreJongos;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;


@Component
public class CompanyService {

    private final JongoCollection companies;
    private final JongoCollection invoices;
    private final EventBus eventBus;

    public CompanyService(@Named("companies") JongoCollection companies,
                          @Named("invoices") JongoCollection invoices,
                          EventBus eventBus) {
        this.companies = companies;
        this.invoices = invoices;
        this.eventBus = eventBus;
    }

    public Iterable<Company> findCompanies(Optional<String> query) {
        QueryBuilder queryBuilder = QueryBuilder.start();

        if (query.isPresent()) {
            queryBuilder.and("name").is(MoreJongos.containsIgnoreCase(query.get())).get();
        }

        return companies.get().find(queryBuilder.get().toString()).sort("{name: 1}").as(Company.class);
    }

    public Iterable<Company> findBuyerCompanies() {
        /* TODO: use aggregate to remove for each in java code
        db.invoices.aggregate({
            $group : {
                _id : "1",
                buyers : { $addToSet: "$buyer._id" }
            }
        })
         */
        Distinct distinct = invoices.get().distinct("buyer");
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            distinct = distinct.query("{ seller._id: #}", new ObjectId(user.getCompanyRef()));
        }
        List<ObjectId> buyers = new ArrayList<ObjectId>();
        for (Company company : distinct.as(Company.class)) {
            if (company.getKey() != null) {
                buyers.add(new ObjectId(company.getKey()));
            }
        }
        return companies.get().find("{_id: {$in:#}}", buyers).as(Company.class);
    }

    public Iterable<Company> findSellerCompanies() {
        Distinct distinct = invoices.get().distinct("seller");
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            distinct = distinct.query("{ seller._id: #}", new ObjectId(user.getCompanyRef()));
        }
        List<ObjectId> buyers = new ArrayList<ObjectId>();
        for (Company company : distinct.as(Company.class)) {
            if (company.getKey() != null) {
                buyers.add(new ObjectId(company.getKey()));
            }
        }
        return companies.get().find("{_id: {$in:#}}", buyers).as(Company.class);
    }

    public Optional<Company> findCompanyByKey(String key) {
        // users can only get their own company except admin and sellers
        User user = AppModule.currentUser();
        if (!key.equals(user.getCompanyRef())
                && !user.getPrincipalRoles().contains(ADMIN)
                && !user.getPrincipalRoles().contains(SELLER)) {
            throw new WebException(HttpStatus.FORBIDDEN);
        }

        return Optional.ofNullable(companies.get().findOne(new ObjectId(key)).as(Company.class));
    }

    public Iterable<Company> findBuyers() {
        return companies.get().find().as(Company.class);
    }

    public Company createCompany(Company company) {
        company = company.setCreationDate(DateTime.now());
        saveCompany(company);
        eventBus.post(Activity.newCreate(company, AppModule.currentUser()));
        return company;
    }

    private void saveCompany(Company company) {
        for (Business business : company.getBusiness()) {
            if (Strings.isNullOrEmpty(business.getReference())) {
                business.setReference(UUID.randomUUID().toString());
            }
        }
        companies.get().save(company);
    }

    public Company updateCompany(Company company) {
        saveCompany(company);
        eventBus.post(Activity.newUpdate(company, AppModule.currentUser()));
        return company;
    }

    public Status deleteCompany(String key) {
        // TODO check that company is not referenced by users

        companies.get().remove(new ObjectId(key));
        eventBus.post(Activity.newDelete(new Company().setKey(key), AppModule.currentUser()));
        return Status.of("deleted");
    }

}
