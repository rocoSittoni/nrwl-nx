import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@nx-commerce/orders';
import { ORDER_STATUS } from '../status-constant';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {

  order: Order;
  statuses = [];
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._mapStatuses();
    this._getOrder();
  }

  private _mapStatuses() {
    this.statuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).subscribe(order => {
      console.log(order);
    })
  }

  private _getOrder() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id) {
        this.ordersService.getOrder(params.id).subscribe(order => {
          this.order = order;
        })
      }
    })
  }

}
