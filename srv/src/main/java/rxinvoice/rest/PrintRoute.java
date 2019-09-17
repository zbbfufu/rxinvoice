package rxinvoice.rest;

import com.google.common.base.Optional;
import com.google.common.base.Strings;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.security.RestxSessionCookieFilter;
import rxinvoice.AppModule;
import rxinvoice.service.PrintService;

import javax.inject.Named;
import java.io.IOException;
import java.io.OutputStream;

/**
 * User: mmuller
 * Date: 31/01/14
 * Time: 18:43
 */
@Component
public class PrintRoute extends StdRoute {
    private static final Logger LOGGER = LoggerFactory.getLogger(PrintRoute.class);

    private String baseUrl;
    private RestxSessionCookieFilter sessionFilter;
    private PrintService printService;

    public PrintRoute(@Named("restx.server.baseUrl") String serverUrl,
                      @Named("serverAddress") Optional<String> serverAddress,
                      RestxSessionCookieFilter sessionFilter,
                      PrintService printService) {

        super("print", new StdRestxRequestMatcher("GET", "/print"));
        this.baseUrl = serverAddress.or(serverUrl);
        this.sessionFilter = sessionFilter;
        this.printService = printService;
    }

    @Override
    public void handle(RestxRequestMatch match, RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        Optional<String> pageUri = req.getQueryParam("pageUri");
        Optional<String> filename = req.getQueryParam("filename");

        OutputStream outputStream = resp.getOutputStream();
        if(Strings.isNullOrEmpty(baseUrl)) {
            LOGGER.warn("Empty variable restx.server.baseUrl use default one...");
            this.baseUrl = req.getBaseUri().substring(0,  req.getBaseUri().indexOf("api"));
        }
        if (pageUri.isPresent() ) {
            if (filename.isPresent()) {
                resp.setHeader("Content-Disposition", "attachment; filename=\"" + StringUtils.stripAccents(filename.get()) + "\"");
            }
            resp.setStatus(HttpStatus.OK);
            resp.setContentType("application/pdf");
            printService.exportUriToPdf(baseUrl, sessionFilter, pageUri.get(), outputStream);
        } else {
            resp.setStatus(HttpStatus.NOT_ACCEPTABLE);
            resp.getWriter().write("Bad arguments, please give pageUri parameters without the starting #"+req.getRestxUri());
        }
    }
}