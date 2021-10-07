import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SwiperCore, { SwiperOptions, Navigation, Virtual } from "swiper";
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([
  Navigation,
  Virtual,
]);

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject();
  featuredProducts: Product[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.productsService.getFeaturedProducts(12)
    .pipe(takeUntil(this.endSub$)).subscribe(products => {
      this.featuredProducts = products;
    })
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
    this.endSub$.complete();
  }

}
