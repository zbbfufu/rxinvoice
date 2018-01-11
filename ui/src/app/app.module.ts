import { InvoiceService } from './services/invoice.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService} from 'ng2-translate';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomerNewComponent } from './pages/customer-new/customer-new.component';
import { InvoiceNewComponent } from './pages/invoice-new/invoice-new.component';
import {RepositoryService} from './services/repository.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';



// export function createTranslateLoader(http: HttpClient) {
//     return new TranslateStaticLoader(http, '' + '/api/i18n', 'labels.json');
// }

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
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        })
    ],
    providers: [
        InvoiceService,
        TranslateService,
        RepositoryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
