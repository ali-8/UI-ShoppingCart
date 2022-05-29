import { Injectable } from '@angular/core';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductCartService {

  constructor(private http: HttpClient) { }

  getProductCartList() {
    return this.http.get<any>(`${environment.apiURL}/Product/cart/list`)
  }

  updateToCart(record): Observable<any> {
    return this.http.patch<any>(`${environment.apiURL}/Product/UpdateCart`, record);
  }

  deleteCart(cartID): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/Product/${cartID}/delete`);
  }

  downloadBill(cartIds) {
    return this.http.post<any>(`${environment.apiURL}/Product/bill`, cartIds, { headers: new HttpHeaders().set('content-type', 'application/json'), responseType: 'blob' as 'json', observe: 'response' });
  }
}
