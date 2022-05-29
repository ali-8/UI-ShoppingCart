import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

 

import { HomeComponent } from '../../home/home.component';
 

import { ProductsComponent } from '../../products/products/products.component';
import { ProductService } from '../../products/products/product.service';
import { ProductsResolver } from '../../products/products/product.resolver';
import { ProductCartComponent } from '../../products/product-cart/product-cart.component';
import { ProductCartService } from '../../products/product-cart/product-cart.service';
import { ProductCartResolver } from '../../products/product-cart/product-cart.resolver';
import { AdminLayoutRoutes } from './admin-layout.routing';
 


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
      ProductsComponent,
      ProductCartComponent
    ],
    providers: [
        ProductService, ProductsResolver,
        ProductCartService, ProductCartResolver],
})

export class AdminLayoutModule {}
