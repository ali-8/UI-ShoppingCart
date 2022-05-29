import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  productList = [];
  popup: ElementRef
  isLargePopup = true;
  error: string;
  success: string;
  
  constructor(private service: ProductService, private route: ActivatedRoute) {
    var resolverData = this.route.snapshot.data['resolvedData']
     // this.productList = resolverData[0];
      this.productList = resolverData;
  }

  hideModal(scheduleModal) {
    scheduleModal.hide();
  }

  ngOnInit(): void {
  }

  addToCart(product) {
    let obj: any = {};
    obj.ProductId = product.productId;
    obj.CostPerUnit = product.productCost;
    obj.ProductQuantity = 1;
    obj.NormalDayDiscount = product.normalDayDiscount;
    obj.AddWeekendsDiscount = product.addWeekendsDiscount;
    obj.Discount = product.addWeekendsDiscount + product.normalDayDiscount;
    obj.DeliveryCharges = product.deliveryCharges;
    obj.TotalCost = product.qty;

    this.service.addToCart(obj).subscribe(
      data => {
        this.handleSuccessMsg('Product successfully added to cart');
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleSuccessMsg(msg) {
    this.error = null;
    this.success = msg;
    setTimeout(() => {
      this.success = null;
    }, 3000)
  }

  handleError(error) {
    if (error.error && error.error.Message !== "") {
      this.error = error.error;
    }
    else
      this.error = 'Error Occured';
  }
}
