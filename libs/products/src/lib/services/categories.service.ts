import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
  }
  
  // editCategory(categoryId: string): Observable<Object> {
  //   return this.http.put<Object>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  // }

  deleteCategory(categoryId: string):Observable<unknown> {
    return this.http.delete<unknown>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  } 

}
