import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {InvoiceNewComponent} from './pages/invoice-new/invoice-new.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    {
        path: '',
        component: AppContentComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'invoices', component: InvoicesComponent },
            { path: 'invoices/new', component: InvoiceNewComponent },
            { path: 'customers', component: CustomersComponent},
            { path: 'customers/new', component: CustomerDetailComponent},
            { path: 'customers/detail/:id', component: CustomerDetailComponent},
            { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

