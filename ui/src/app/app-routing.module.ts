import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {InvoiceDetailComponent} from './pages/invoice-detail/invoice-detail.component';
import {LoggedInGuard} from './common/guards/logged-in.guard';
import {StyleguideComponent} from './style-guide-module/styleguide.component';
import {ColorsGuideComponent} from './style-guide-module/colors-guide/colors-guide.component';
import {TypographyGuideComponent} from './style-guide-module/typography-guide/typography-guide.component';
import {IconsGuideComponent} from './style-guide-module/icons-guide/icons-guide.component';
import {ButtonsGuideComponent} from './style-guide-module/buttons-guide/buttons-guide.component';
import {FormsGuideComponent} from './style-guide-module/forms-guide/forms-guide.component';

const routes: Routes = [
    {path: 'login', pathMatch: 'full', component: LoginComponent},
    {
        path: 'app',
        canActivate: [LoggedInGuard],
        component: AppContentComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'invoices', component: InvoicesComponent},
            {path: 'invoices/new', component: InvoiceDetailComponent},
            {path: 'invoices/detail/:id', component: InvoiceDetailComponent},
            {path: 'customers', component: CustomersComponent},
            {path: 'customers/new', component: CustomerDetailComponent},
            {path: 'customers/detail/:id', component: CustomerDetailComponent},
            {path: '**', redirectTo: '/app/dashboard'}

        ]
    },
    {path: '', redirectTo: '/app/dashboard', pathMatch: 'full'},
    { path: 'guide',
        component: StyleguideComponent,
        children: [
            {path: 'colors', component: ColorsGuideComponent},
            {path: 'typography', component: TypographyGuideComponent},
            {path: 'icons', component: IconsGuideComponent},
            {path: 'buttons', component: ButtonsGuideComponent},
            {path: 'forms', component: FormsGuideComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

