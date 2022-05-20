import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import {CarouselModule} from 'primeng-lts/carousel';

@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './swiper-carousel.component.html',
  styleUrls: ['./swiper-carousel.component.scss']
})
export class SwiperCarouselComponent implements OnInit, OnDestroy {

  productsByCategory: Product[] = [];
  solvedCategories = [];

  cars = ['asd', 'dfg', 'ghj', 'jkl', 'qwe', 'ert'];
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];

  constructor(
    private productsService: ProductsService,
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
    this._getProductsByCategory();
  }

  private _getProductsByCategory() {
    this.productsService.getProductsByCategory().subscribe(products => {
      this.productsByCategory = products;
      this.solveProductsByCategory();
    })
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

  ngOnDestroy() {
  }

}
