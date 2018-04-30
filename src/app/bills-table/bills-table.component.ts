import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";
import { Bill } from "../bill";

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.css']
})
export class BillsTableComponent implements OnInit {
  oldBills: any;
  billOfYearArray: Array<Bill> = new Array<Bill>();
  yearArray: Array<Array<Bill>> = new Array<Array<Bill>>();
  yearBoolArray: Array<boolean> = new Array<boolean>();
  

  constructor(private billService : BillService) {
    console.log('BillsArray', billService.billsArray);
    this.oldBills = billService.billsArray.slice(0);
    this.oldBills.splice(this.oldBills.length - 1,1); 
    let counter = 0;
    for(let i = 0; i < 4; i++){
            
      for(let bill of this.oldBills){
        let date = new Date(bill.billDate);
        console.log('Neues Datum', date);
        console.log('Monat', date.getMonth());
        if(parseInt(bill.billDate.slice(0, 4)) === new Date().getFullYear() - counter ){
          this.billOfYearArray.push(bill);
        }
      }
      if(this.billOfYearArray.length > 0){
        this.yearBoolArray.push(false);
        this.yearArray.push(this.billOfYearArray); 
      }
      this.billOfYearArray = new Array<Bill>(); 
      counter++;
    }
    this.yearBoolArray[0] = true;
      console.log('oldBills', this.oldBills);
  }

  ngOnInit() {

  }

  clickYear(year){
    if(this.yearBoolArray[ parseInt(this.yearArray[0][0].billDate.toString().slice(0, 4)) - parseInt(year)] === true){
      this.yearBoolArray[ parseInt(this.yearArray[0][0].billDate.toString().slice(0, 4)) - parseInt(year)] = false;
    }else {
      this.yearBoolArray[ parseInt(this.yearArray[0][0].billDate.toString().slice(0, 4)) - parseInt(year)] = true;
    }
  }

}
