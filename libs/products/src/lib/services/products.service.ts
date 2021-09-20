import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '@nx-commerce/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productsApiUrl: string = environment.apiUrl + '/products';
  
  constructor(private http: HttpClient) {

  }

  // getProduct(productId: string): Observable<Product> {
  //   return this.http.get<Product>(`${this.productsApiUrl}/${productId}`);
  // }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsApiUrl);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.productsApiUrl, productData);
  }
  
  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.productsApiUrl}/${product.id}`, product);
  // }

  // deleteProduct(productId: string):Observable<Product> {
  //   return this.http.delete<Product>(`${this.productsApiUrl}/${productId}`);
  // } 

}
