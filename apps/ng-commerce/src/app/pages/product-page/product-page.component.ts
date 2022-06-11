import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  endSub$: Subject<any> = new Subject(); 
  quantity: number;
  mockedRating = 5;


  images: any[];

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];


  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productId) {
        this._getProduct(params.productId);
      }
    });
    this.images = ['']
  }

  private _getProduct(id: string) {
    this.productsService.getProduct(id).pipe(takeUntil(this.endSub$)).subscribe(product => {
      this.product = product;
    });
  }

  addProductToCart() {
    
  }

  ngOnDestroy() {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
