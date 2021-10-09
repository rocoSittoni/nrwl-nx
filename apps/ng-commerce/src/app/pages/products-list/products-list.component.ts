import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  categories: Category[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter)
      .pipe(takeUntil(this.endSub$))
      .subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSub$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    this._getProducts(selectedCategories)
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
