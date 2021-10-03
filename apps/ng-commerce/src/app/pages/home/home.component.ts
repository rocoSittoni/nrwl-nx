import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
  }

  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
