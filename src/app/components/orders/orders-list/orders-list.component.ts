import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OrdersService } from "../../../shared/services/orders.service";

export interface Orders {
  orderNumber: number;
  customerName: string;
  order: string;
  done: boolean;
  total: number;
}

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"]
})
export class OrdersListComponent implements OnInit {
  constructor(private orderService: OrdersService) {}

  displayedColumns: string[] = [
    "orderNumber",
    "customerName",
    "order",
    "done",
    "total",
    "actions"
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    //get all orders
    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.sort = this.sort;
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  onEdit(order: any) {
    order.done = true;
    this.orderService.updateOrder(order);
  }

  onDelete(id: string) {
    this.orderService.deleteOrder(id);
  }
}
