import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@nx-commerce/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORDER_STATUS } from '../status-constant';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {

  order: Order;
  statuses = [];
  selectedStatus: any;
  endSub$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this._mapStatuses();
    this._getOrder();
  }

  private _mapStatuses() {
    this.statuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value}, this.order.id)
    .pipe(takeUntil(this.endSub$))
    .subscribe(order => {
      this._snackBar.open('Status Updated', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
    }, () => {
      this._snackBar.open('Failed to update status', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _getOrder() {
    this.activatedRoute.params.pipe(takeUntil(this.endSub$)).subscribe(params => {
      if(params.id) {
        this.ordersService.getOrder(params.id).pipe(takeUntil(this.endSub$))
        .subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
