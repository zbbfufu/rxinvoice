import { InvoiceService } from './services/invoice.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService} from "ng2-translate";

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '' + '/api/i18n', 'labels.json');
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        InvoicesListComponent,
        SidebarComponent,
        AppHeaderComponent,
        CustomersListComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    providers: [
        InvoiceService,
        TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
