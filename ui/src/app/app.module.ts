import { HeaderComponent } from './components/header/header.component';
import { InvoiceService } from './services/invoice.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        AppComponent,
        DashboardComponent,
        InvoicesListComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        InvoiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
