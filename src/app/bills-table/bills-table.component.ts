import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.css']
})
export class BillsTableComponent implements OnInit {
  oldBills: any;
  constructor(private billService : BillService) {
      this.oldBills = billService.billsArray.slice(0);
      this.oldBills.splice(this.oldBills.length - 1,1); 
      console.log(this.oldBills);
   }

  ngOnInit() {

  }

}
