import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnDestroy {

  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];

  endSub$: Subject<any> = new Subject();
  featuredProducts: Product[] = [];

  constructor(
    private productsService: ProductsService
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
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.productsService.getFeaturedProducts(12)
    .pipe(takeUntil(this.endSub$)).subscribe(products => {
      this.featuredProducts = products;
    })
  }
  
  ngOnDestroy() {
    this.endSub$.complete();
  }

}
