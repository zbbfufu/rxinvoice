import { InvoiceService } from './services/invoice.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomerNewComponent } from './pages/customer-new/customer-new.component';
import { InvoiceNewComponent } from './pages/invoice-new/invoice-new.component';
import { RepositoryService } from './services/repository.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpInterceptorService } from './services/http-interceptor.service';
import {CommonModule} from '@angular/common';
import { CustomersComponent } from './pages/customers/customers.component';
import {CompanyService} from './services/company.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/api/i18n/', 'labels.json');
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        InvoicesListComponent,
        SidebarComponent,
        AppHeaderComponent,
        CustomersListComponent,
        CustomerNewComponent,
        InvoiceNewComponent,
        CustomersComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        InvoiceService,
        TranslateService,
        RepositoryService,
        CompanyService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
