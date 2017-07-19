import { Component, OnInit, AfterViewInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { BillService } from "../services/bill.service";
import { Observable } from 'rxjs/Observable';
import { VendorEditorComponent } from "../vendor-editor/vendor-editor.component";
import { CustomerEditorComponent } from "../customer-editor/customer-editor.component";
import { CustomerListComponent } from "../customer-list/customer-list.component";

@Component({
  selector: 'app-input-popup',
  templateUrl: './input-popup.component.html',
  styleUrls: ['./input-popup.component.css']
})
export class InputPopupComponent implements OnInit{
  

    showOpenInputs: boolean = false; 
  bill: any;
  

  constructor(private billService : BillService, private differs : KeyValueDiffers) { 
   let subscription = this.billService.bills.subscribe(bills => {
     this.bill = bills[bills.length -1];
     //console.log(this.bill);
     this.unclosedInputs();
     
   });
    subscription.unsubscribe();
  }

  ngOnInit() {}

  unclosedInputs(): any {
    if(this.bill === undefined){
      return;
    }
    if (this.bill.reNr !== undefined){
       this.billService.hasReNr = true;
    }
    if (this.bill.billDate !== undefined){
        this.billService.hasDate = true;
    }
    if (this.bill.vendor !== undefined){
      this.billService.hasVendor = true;
      
    }
    if (this.bill.customer !== undefined){
      this.billService.hasCustomer = true;
      
    }
   // this.testBooleans();
    
  }

  testBooleans(){
    console.log(this.billService.hasReNr + ": " + this.bill.reNr);
    console.log(this.billService.hasDate + ": " + this.bill.billDate);
    console.log(this.billService.hasVendor + ": " + this.bill.vendor);
    console.log(this.billService.hasCustomer + ": " + this.bill.customer);
  }



}