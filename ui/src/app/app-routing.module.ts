import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CustomersListComponent} from "./pages/customers-list/customers-list.component";
import {CustomerNewComponent} from "./pages/customer-new/customer-new.component";
import {InvoiceNewComponent} from "./pages/invoice-new/invoice-new.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'invoices', component: InvoicesListComponent },
    { path: 'invoices/new', component: InvoiceNewComponent },
    { path: 'customers', component: CustomersListComponent},
    { path: 'customers/new', component: CustomerNewComponent},
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

