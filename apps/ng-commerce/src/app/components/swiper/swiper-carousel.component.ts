import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';

@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './swiper-carousel.component.html',
  styleUrls: ['./swiper-carousel.component.scss']
})
export class SwiperCarouselComponent implements OnInit {

  productsByCategory: Product[] = [];
  categories: Category[] = [];
  solvedCategories = [];
  categoryName: string = 'WHERE ARE THEY?!!';
  catName = [];

  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    // remember to unsuscribe from observables;
    this._getProductsByCategory();
    this._getCategories();
  }

  private _getProductsByCategory() {
    this.productsService.getProductsByCategory().subscribe(products => {
      this.productsByCategory = products;
      this.solveProductsByCategory();
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.solveCategoryTitle();
    })
  }

  solveCategoryTitle() {
    for(let category of this.solvedCategories) {
      for(let cat of category) {
        this.categories.forEach(asd => asd.id === cat.category ? this.catName.push(asd.name) : '');
        this.catName = [... new Set(this.catName)];
      }
    }
  }

  solveProductsByCategory() {
    let unformatedCategoryArray = Object.keys(this.productsByCategory);
    this.solvedCategories = [];
    let i = 0;
    for (let prop of unformatedCategoryArray ) {
      this.solvedCategories.push(this.productsByCategory[prop]);
      this.solvedCategories[i].category = prop;
      i++;
    }
    this.solvedCategories = this.solvedCategories.map(categories => categories.splice(0))
  }

}
