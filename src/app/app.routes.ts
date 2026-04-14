import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard], children: [
            { path: 'orders', component: AdminOrdersComponent },
            { path: 'products', component: AdminProductsComponent },
            { path: '', redirectTo: 'orders', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];

