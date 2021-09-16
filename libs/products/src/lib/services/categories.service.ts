import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  categoriesApiUrl: string = environment.apiUrl + 'categories';
  
  constructor(private http: HttpClient) {

  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesApiUrl}/${categoryId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApiUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesApiUrl, category);
  }
  
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoriesApiUrl}/${category.id}`, category);
  }

  deleteCategory(categoryId: string):Observable<Category> {
    return this.http.delete<Category>(`${this.categoriesApiUrl}/${categoryId}`);
  } 

}
