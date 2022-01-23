import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  products: Product[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getCategories();
    this._getProducts();
  }
  
  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  private _getProducts() {
    this.productsService.getProducts()
      .pipe(takeUntil(this.endSub$))
      .subscribe(products => {
        this.products = products;
    });
  }

  ngOnDestroy() {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
