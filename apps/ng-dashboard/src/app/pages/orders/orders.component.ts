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
  statuses = ORDER_STATUS;
  mapedStatuses: any[] = [];
  // orderStatus: any;

  displayedColumns: String[] = ['user', 'totalPrice', 'dateOrdered', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>(this.orders);
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
      this._mapStatuses()
    });
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

  private _mapStatuses() {
    this.mapedStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });
    this._asignStatus();
  }
  
  private _asignStatus() {
    for(let order of this.orders) {
      let myOrder = this.mapedStatuses.filter(status => status.id == order.status);
      order.status = myOrder[0].name;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
