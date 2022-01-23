import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input, OnChanges } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';
import SwiperCore, { SwiperOptions, Navigation, Virtual } from "swiper";
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([
  Navigation,
  Virtual,
]);

@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './swiper-carousel.component.html',
  styleUrls: ['./swiper-carousel.component.scss']
})
export class SwiperCarouselComponent implements OnInit, OnDestroy, OnChanges {

  @Input() products: Product[];
  @Input() categories: Category[];
  categoryAndProducts = [];
  categoryProducts: {categori: Category, productss: Product[]}[] = []

  constructor(
  ) { }

  ngOnInit(): void {
    // this.getProductsByCategory();
  }

  ngOnChanges() {
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    for(let category of this.categories) {
        let categoryProducts = this.products.filter(product => product.category.name === category.name);
        if(categoryProducts[0].category.name === category.name) {
          this.categoryAndProducts = [category, ...categoryProducts]
        };
        this.mergeCategoryWithProducts()
      }
  }

  mergeCategoryWithProducts() {
    console.log(this.categoryAndProducts)
    // this.categoryProducts.push({this.categoryAndProducts[0], ...this.categoryAndProducts})
  }
  

  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent;
  
  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  breakpoints = {
    300: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 40 },
  };

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    virtual: true,
    centeredSlides: true,
    breakpoints: this.breakpoints,
    loop: true,
  }

  ngOnDestroy() {
  }

}
