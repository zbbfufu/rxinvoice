import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CustomersListComponent} from "./pages/customers-list/customers-list.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'invoices', component: InvoicesListComponent },
    { path: 'customers', component: CustomersListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

