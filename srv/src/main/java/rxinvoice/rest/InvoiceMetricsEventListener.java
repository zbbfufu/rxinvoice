package rxinvoice.rest;

import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.common.UUIDGenerator;
import restx.exceptions.ErrorCode;
import restx.exceptions.RestxError;
import restx.exceptions.RestxErrors;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.rest.events.InvoiceUpdatedEvent;

@RestxResource
@Component
public class InvoiceMetricsEventListener implements AutoCloseable {
    @ErrorCode(code = "SNBC-001", description = "This uri must not be called", status= HttpStatus.FORBIDDEN)
    public static enum ShouldNotBeCalled {}

    private EventBus eventBus;
    private InvoiceMetricsResource invoiceMetricsResource;

    public InvoiceMetricsEventListener(EventBus eventBus, InvoiceMetricsResource invoiceMetricsResource) {
        this.eventBus = eventBus;
        this.invoiceMetricsResource = invoiceMetricsResource;

        eventBus.register(this);
    }

    @Subscribe
    public void handleInvoiceUpdated(InvoiceUpdatedEvent event) {
        invoiceMetricsResource.computeInvoiceMetricsSync(event.getInvoice());
    }

    // Create a fake route to be a RestxResource, to force restx to create an instance of
    // ProjectMetricsEventListener, which is not referenced by any other class.
    @GET("/metrics/mustNotBeCalled")
    public String test() {
        throw new RestxErrors(new UUIDGenerator.DefaultUUIDGenerator()).on(ShouldNotBeCalled.class).raise();
    }

    @Override
    public void close() throws Exception {
        eventBus.unregister(this);
    }
}