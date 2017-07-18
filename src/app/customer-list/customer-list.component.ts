import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(
    private billService: BillService,
    private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }

  deleteCustomer(customer){
    this.billService.tmpCustomer = customer; 
    this.appComponent.deleteCustomerPopup();
  }

}
