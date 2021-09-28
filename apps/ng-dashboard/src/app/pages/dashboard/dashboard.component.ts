import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@nx-commerce/orders';
import { ProductsService } from '@nx-commerce/products';
import { UsersService } from '@nx-commerce/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.usersService.getUsersCount(),
      this.productsService.getProductsCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endSub$)).subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
