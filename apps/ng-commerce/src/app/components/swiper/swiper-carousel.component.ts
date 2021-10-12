import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { Category } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class SwiperCarouselComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject();
  @Input() categories: Category[] = [];

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
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
