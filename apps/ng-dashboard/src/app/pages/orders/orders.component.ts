import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order, OrdersService } from '@nx-commerce/orders';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ORDER_STATUS } from './status-constant';
import { DialogService } from '@nx-commerce/ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = []
  displayedColumns: String[] = ['user', 'totalPrice', 'dateOrdered', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>(this.orders);
  orderStatus = ORDER_STATUS;
  endSub$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private dialogService: DialogService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders()
    .pipe(takeUntil(this.endSub$))
    .subscribe((orders) => {
      this.orders = orders;
    })
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.dialogService.confirmDialog({
      title: "Sure you want to delete this order?",
      message: "This action can't be undone",
      confirmText: "Sure",
      cancelText: "No"
    })
    .pipe(takeUntil(this.endSub$))
    .subscribe((sure) => {
      if (sure) {
        this.ordersService.deleteOrder(orderId)
        .pipe(takeUntil(this.endSub$))
        .subscribe( () => {
        this._getOrders();
        this._snackBar.open('Order deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackBar.open('Failed to delete order', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 4000,
            panelClass: 'failed-snack'
          });
      }); };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
