package rxinvoice.rest;

import org.bson.types.ObjectId;
import restx.annotations.GET;
import restx.annotations.POST;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.security.RolesAllowed;
import rxinvoice.domain.Business;
import rxinvoice.domain.Company;
import rxinvoice.domain.Invoice;

import javax.inject.Named;
import java.util.Map;
import java.util.UUID;

import static rxinvoice.AppModule.Roles.CORS;


@Component
@RestxResource
public class CorsResource {

    private final JongoCollection companies;
    private final JongoCollection invoices;

    public CorsResource(@Named("companies") JongoCollection companies, @Named("invoices") JongoCollection invoices) {
        this.companies = companies;
        this.invoices = invoices;
    }

    @RolesAllowed({CORS})
    @GET("/cors/companies")
    public Iterable<Company> findCompanies() {
        return companies.get().find().as(Company.class);
    }

    @RolesAllowed({CORS})
    @GET("/cors/invoices/seller/{companyKey}/{businessRef}")
    public Iterable<Invoice> findInvoiceBySeller(String companyKey, String businessRef) {
        return invoices.get().find("{buyer._id: #, business.reference: #}", new ObjectId(companyKey), businessRef).as(Invoice.class);
    }

    @RolesAllowed({CORS})
    @POST("/cors/business")
    public Object createBusiness(Map<String, Object> params) {
        String companyId = (String) params.get("company");
        String businessName = (String) params.get("business");
        Business business = null;
        if (businessName != null) {
            Company company = companies.get().findOne(new ObjectId(companyId)).as(Company.class);
            if (company != null) {
                business = new Business()
                        .setName(businessName)
                        .setReference(UUID.randomUUID().toString());
                company.getBusiness().add(business);
                companies.get().save(company);
            }
        }
        return business;
    }

}
