import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-commerce/products';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  constructor(private categoriesService: CategoriesService) {
    console.log(this.categories)
  }
  
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((catgs) => {
      this.categories = catgs;
    });
  }

  categories: Category[] = [];
  
  displayedColumns: String[] = ['id', 'name', 'icon'];

}
