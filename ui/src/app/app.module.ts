import { InvoiceService } from './services/invoice.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
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
import { LoginComponent } from './pages/login/login.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import { AppContentComponent } from './app-content/app-content.component';
import {AuthenticationService} from './services/authentication.service';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {InvoicesListComponent} from './components/invoices-list/invoices-list.component';
import {CustomersListComponent} from './components/customers-list/customers-list.component';

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
        CustomerNewComponent,
        InvoiceNewComponent,
        CustomersComponent,
        LoginComponent,
        AppContentComponent,
        InvoicesComponent,
        CustomersListComponent
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
        LoggedInGuard,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
