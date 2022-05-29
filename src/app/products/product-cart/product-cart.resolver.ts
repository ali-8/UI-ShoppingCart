import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductCartService } from './product-cart.service';

@Injectable()
export class ProductCartResolver implements Resolve<any> {

  constructor(private service: ProductCartService) { }

  resolve() {
    //return Observable. forkJoin([
    //  this.service.getProductCartList()
    //]);

      return this.service.getProductCartList();
  }
}

