import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  ordersApiUrl: string = environment.apiUrl + '/orders';
  
  constructor(private http: HttpClient) {

  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.ordersApiUrl}/${orderId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersApiUrl);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersApiUrl, order);
  }
  
  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.ordersApiUrl}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string):Observable<Order> {
    return this.http.delete<Order>(`${this.ordersApiUrl}/${orderId}`);
  }

  getOrdersCount(): Observable<{ordersCount: number}> {
    return this.http.get<{ordersCount: number}>(`${this.ordersApiUrl}/get/count`);
  }

  getTotalSales(): Observable<{totalSales: number}> {
    return this.http.get<{totalSales: number}>(`${this.ordersApiUrl}/get/totalsales`);
  }

}