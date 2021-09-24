import { Component, OnInit, ViewChild } from '@angular/core';
import { Order, OrdersService } from '@nx-commerce/orders';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ORDER_STATUS } from './status-constant';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []
  displayedColumns: String[] = ['user', 'totalPrice', 'dateOrdered', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>(this.orders);
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
