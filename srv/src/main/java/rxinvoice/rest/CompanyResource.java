package rxinvoice.rest;

import restx.Status;
import restx.annotations.*;
import restx.factory.Component;
import restx.security.RolesAllowed;
import rxinvoice.domain.Company;
import rxinvoice.service.CompanyService;

import java.util.Optional;

import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;

/**
 *
 */
@Component
@RestxResource
public class CompanyResource {
    private final CompanyService companyService;

    public CompanyResource(CompanyService companyService) {
        this.companyService = companyService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/companies")
    public Iterable<Company> findCompanies(Optional<String> query) {
        return companyService.findCompanies(query);
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/companies/buyers")
    public Iterable<Company> findBuyerCompanies() {
        return companyService.findBuyerCompanies();
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/companies/sellers")
    public Iterable<Company> findSellerCompanies() {
        return companyService.findSellerCompanies();
    }

    @GET("/companies/{key}")
    public Optional<Company> findCompanyByKey(String key) {
        return companyService.findCompanyByKey(key);
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/companies/buyer")
    public Iterable<Company> findBuyers() {
        return companyService.findBuyers();
    }

    @RolesAllowed({ADMIN, SELLER})
    @POST("/companies")
    public Company createCompany(Company company) {
        return companyService.createCompany(company);
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/companies/{key}")
    public Company updateCompany(String key, Company company) {
        checkEquals("key", key, "company.key", company.getKey());
        return companyService.updateCompany(company);
    }

    @RolesAllowed(ADMIN)
    @DELETE("/companies/{key}")
    public Status deleteCompany(String key) {
        return companyService.deleteCompany(key);
    }

}
