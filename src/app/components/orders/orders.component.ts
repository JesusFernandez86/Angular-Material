import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../shared/services/orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrdersService) {}
  products = [
    { name: "Asus Zenbook duo", price: 1499 },
    { name: "Asus vivobook", price: 799 },
    { name: "MSI Prestige 14", price: 1199 },
    { name: "Macbook air 2019", price: 1499 },
    { name: "Lenovo 600", price: 549 },
    { name: "Hp Pavilion", price: 679 },
    { name: "Dell XPS 13", price: 1399 },
    { name: "Dell Alienware", price: 2199 },
    { name: "Macbook Pro", price: 2600 }

  ];

  appName: string = "Shoppingzon!";
  totalOrder = 0;
  tempOrder = [];

  ngOnInit() {}
  
  addProduct(product) {
    this.totalOrder = this.totalOrder + product.price;
    this.tempOrder.push(product.name);
  }

  removeItemFromOrder(order) {
    let index = this.tempOrder.indexOf(order);
    if (index > -1) this.tempOrder.splice(index, 1);
  }

  onSubmmit() {
    this.orderService.myForm.value.order = this.tempOrder;
    let data = this.orderService.myForm.value;
    data.totalOrder = this.totalOrder;
    //call service
    this.orderService.createOrder(data);
    this.tempOrder = [];
    this.totalOrder = 0;
    this.orderService.myForm.reset();
  }
}
