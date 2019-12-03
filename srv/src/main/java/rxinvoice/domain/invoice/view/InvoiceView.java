package rxinvoice.domain.invoice.view;

import restx.i18n.Messages;
import rxinvoice.domain.VATAmount;
import rxinvoice.domain.VATVal;
import rxinvoice.domain.company.Business;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.Line;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class InvoiceView {

        DateFormat dateFormat = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.FRANCE);

        private String key;

        private String date;
        private String dueDate;

        private boolean withVAT;
        private List<VATVal.VATValView> vats = new ArrayList<>();
        private List<VATAmount.VATAmountView> vatsAmount = new ArrayList<>();
        private List<Line.LineView> lines = new ArrayList<>();

        private String reference;
        private String object;
        private String kind;
        private Business business;

        private Company.CompanyView seller;
        private Company.CompanyView buyer;


        private String grossAmount;
        private String netAmount;

        public InvoiceView(Invoice invoice, Messages messages, Locale locale) {
            this.key = invoice.getKey();
            this.date = (invoice.getDate() == null) ? "" : dateFormat.format(invoice.getDate().toDate());
            this.dueDate = (invoice.getDueDate() == null) ? "" : dateFormat.format(invoice.getDueDate().toDate());
            this.withVAT = invoice.isWithVAT();
            for (VATVal vat : invoice.getVats()) {
                this.vats.add(vat.toVatView());
            }
            for (VATAmount vat : invoice.getVatsAmount()) {
                this.vatsAmount.add(vat.toVatAmountView());
            }
            for (Line line : invoice.getLines()) {
                this.lines.add(line.toLineView());
            }
            this.reference = invoice.getReference();
            this.object = invoice.getObject();
            this.kind = messages.getMessage("invoice.kind." + invoice.getKind().name(), locale);
            this.business = invoice.getBusiness();
            this.seller = invoice.getSeller().toCompanyView();
            this.buyer = invoice.getBuyer().toCompanyView();
            this.grossAmount = (invoice.getGrossAmount() == null) ? "0.00" :  invoice.getGrossAmount().setScale(2).toString();
            this.netAmount = (invoice.getNetAmount() == null) ? "0.00" :  invoice.getNetAmount().setScale(2).toString();
        }

        @Override
        public String toString() {
            return "InvoiceView{" +
                    "dateFormat=" + dateFormat +
                    ", key='" + key + '\'' +
                    ", date='" + date + '\'' +
                    ", dueDate='" + dueDate + '\'' +
                    ", withVAT=" + withVAT +
                    ", vats=" + vats +
                    ", vatsAmount=" + vatsAmount +
                    ", lines=" + lines +
                    ", reference='" + reference + '\'' +
                    ", object='" + object + '\'' +
                    ", kind=" + kind +
                    ", business=" + business +
                    ", seller=" + seller +
                    ", buyer=" + buyer +
                    ", grossAmount=" + grossAmount +
                    ", netAmount=" + netAmount +
                    '}';
        }

        public DateFormat getDateFormat() {
            return dateFormat;
        }

        public InvoiceView setDateFormat(DateFormat dateFormat) {
            this.dateFormat = dateFormat;
            return this;
        }

        public String getKey() {
            return key;
        }

        public InvoiceView setKey(String key) {
            this.key = key;
            return this;
        }

        public String getDate() {
            return date;
        }

        public InvoiceView setDate(String date) {
            this.date = date;
            return this;
        }

        public String getDueDate() {
            return dueDate;
        }

        public InvoiceView setDueDate(String dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public boolean isWithVAT() {
            return withVAT;
        }

        public InvoiceView setWithVAT(boolean withVAT) {
            this.withVAT = withVAT;
            return this;
        }

        public List<VATVal.VATValView> getVats() {
            return vats;
        }

        public InvoiceView setVats(List<VATVal.VATValView> vats) {
            this.vats = vats;
            return this;
        }

        public List<VATAmount.VATAmountView> getVatsAmount() {
            return vatsAmount;
        }

        public InvoiceView setVatsAmount(List<VATAmount.VATAmountView> vatsAmount) {
            this.vatsAmount = vatsAmount;
            return this;
        }

        public List<Line.LineView> getLines() {
            return lines;
        }

        public InvoiceView setLines(List<Line.LineView> lines) {
            this.lines = lines;
            return this;
        }

        public String getReference() {
            return reference;
        }

        public InvoiceView setReference(String reference) {
            this.reference = reference;
            return this;
        }

        public String getObject() {
            return object;
        }

        public InvoiceView setObject(String object) {
            this.object = object;
            return this;
        }

        public String getKind() {
            return kind;
        }

        public InvoiceView setKind(String kind) {
            this.kind = kind;
            return this;
        }

        public Business getBusiness() {
            return business;
        }

        public InvoiceView setBusiness(Business business) {
            this.business = business;
            return this;
        }

        public Company.CompanyView getSeller() {
            return seller;
        }

        public InvoiceView setSeller(Company.CompanyView seller) {
            this.seller = seller;
            return this;
        }

        public Company.CompanyView getBuyer() {
            return buyer;
        }

        public InvoiceView setBuyer(Company.CompanyView buyer) {
            this.buyer = buyer;
            return this;
        }

        public String getGrossAmount() {
            return grossAmount;
        }

        public InvoiceView setGrossAmount(String grossAmount) {
            this.grossAmount = grossAmount;
            return this;
        }

        public String getNetAmount() {
            return netAmount;
        }

        public InvoiceView setNetAmount(String netAmount) {
            this.netAmount = netAmount;
            return this;
        }
    }