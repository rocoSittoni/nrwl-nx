import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '@nx-commerce/products';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productsApiUrl: string = environment.apiUrl + '/products';
  
  constructor(private http: HttpClient) {

  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsApiUrl}/${productId}`);
  }

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(this.productsApiUrl, {params: params});
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.productsApiUrl, productData);
  }
  
  updateProduct(productFormData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.productsApiUrl}/${productId}`, productFormData);
  }

  deleteProduct(productId: string):Observable<Product> {
    return this.http.delete<Product>(`${this.productsApiUrl}/${productId}`);
  }

  getProductsCount(): Observable<{productCount: number}> {
    return this.http.get<{productCount: number}>(`${this.productsApiUrl}/get/count`);
  }

  getProductsByCategory() {
    return this.http.get<Product[]>(`${this.productsApiUrl}/getProductsByCategory`);
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsApiUrl}/get/featured/${count}`);
  }

}
