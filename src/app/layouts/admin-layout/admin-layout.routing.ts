import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { ProductsComponent } from '../../products/products/products.component';
import { ProductsResolver } from '../../products/products/product.resolver';
import { ProductCartComponent } from '../../products/product-cart/product-cart.component';
import { ProductCartResolver } from '../../products/product-cart/product-cart.resolver';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'products', component: ProductsComponent, resolve: { resolvedData: ProductsResolver } },
    { path: 'cart', component: ProductCartComponent, resolve: { resolvedData: ProductCartResolver } }
];
