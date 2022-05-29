import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductService } from './product.service';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(private service: ProductService) { }

  resolve() {
    //return Observable.forkJoin([
    //  this.service.getProductList()
    //]);
      return this.service.getProductList();
        
     
  }
}

