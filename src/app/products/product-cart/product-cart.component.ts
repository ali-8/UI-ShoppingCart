import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCartService } from './product-cart.service';


@Component({
    selector: 'app-product-cart',
    templateUrl: './product-cart.component.html',
    styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

    error: string;
    success: string;
    grandTotal = 0;
    cart: any;
    cartIds = [];
    productCartList = [];

    constructor(private service: ProductCartService, private route: ActivatedRoute) {
        var resolverData = this.route.snapshot.data['resolvedData']
        this.cart = resolverData;
        this.productCartList = this.cart.shoppingCartDTO;
        this.productCartList.forEach(x => { this.cartIds.push(x.cartID) });
    }


    ngOnInit(): void {
    }

    calculateGrandTotal() {
        this.productCartList.forEach(c => {
            this.grandTotal += c.totalCost;
        });
    }

    calculate(cartObj) {
        if (cartObj.productQuantity == null) {
            console.log('error');
            cartObj.productQuantity = 0;
        } else {
            var totalCost = cartObj.costPerUnit - ((cartObj.costPerUnit * (cartObj.normalDayDiscount + cartObj.addWeekendsDiscount)) / 100);
            var TotalCost = (totalCost * cartObj.productQuantity) + cartObj.deliveryCharges
            cartObj.totalCost = TotalCost;
            this.grandTotal = 0;
            this.calculateGrandTotal();

            console.log('TotalCost', TotalCost);
            if (this.grandTotal >= 25000) {
                this.grandTotal = this.grandTotal - ((this.grandTotal * (10)) / 100);
                this.cart.finalDiscount = true;
            } else {
                this.cart.finalDiscount = false;
            }
            this.cart.cartTotal = this.grandTotal;
        }
        console.log('cartObj', cartObj);
    }


    updateCart(cartObj) {
        this.service.updateToCart(cartObj).subscribe(
            data => {
                this.handleSuccessMsg('Product quantity updated successfully');
            },
            error => {
                this.handleError(error);
            }
        );
    }


    deleteCart(cartID) {
        this.service.deleteCart(cartID).subscribe(
            data => {
                this.handleSuccessMsg('Product deleted from cart successfully');
            },
            error => {
                this.handleError(error);
            }
        );
    }

    downloadPdf() {
        this.service.downloadBill(this.cartIds).subscribe(
            data => {
                var blob = new Blob([data.body], { type: 'application/pdf' });
                var filename = 'Bill.pdf'; //data.headers.get('content-disposition').split('=')[1].trim().replace(/\"/g, '');
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                //  window.open(link.href , filename);
                link.target = '_blank';
                link.download = filename;
                link.click();

                setTimeout(function () {
                    window.URL.revokeObjectURL(link.href);
                }, 0);
            },
            error => {
                this.error = "Error downloading pdf";
            });
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
