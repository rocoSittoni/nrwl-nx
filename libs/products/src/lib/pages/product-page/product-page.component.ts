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
  }

  private _getProduct(id: string) {
    this.productsService.getProduct(id).pipe(takeUntil(this.endSub$)).subscribe(product => {
      this.product = product;
    });
  }

  ngOnDestroy() {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
