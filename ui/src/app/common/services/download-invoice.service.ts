import {Injectable} from '@angular/core';

@Injectable()
export class DownloadInvoiceService {

    private baseUrl = '/api/print';

    constructor() {
    }

    seeInvoice(invoice) {
        const url = this.baseUrl + '?pageUri=/invoice_view/' + invoice._id;
        const url2 = '&filename=' + invoice.generatePdfFilename(invoice);
        window.open(url + url2, '_blank');
    }

    downloadInvoice(invoice) {
        const url = this.baseUrl + '?pageUri=/invoice_view/' + invoice._id ;
        const url2 = '&filename=' + invoice.generatePdfFilename(invoice);
        window.location.href = url + url2;
    }

}
