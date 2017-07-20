import { BillService } from './services/bill.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { Popup } from "ng2-opd-popup";
import { BillPreviewComponent } from "./bill-preview/bill-preview.component";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('inputPopup') inputPopup: Popup;
  @ViewChild('deletePopup') deletePopup: Popup;
  @ViewChild('delCustomerPopup') delCustomerPopup: Popup;
  
  title = 'app works!';
  array: Array<any> = new Array<any>();
  date: any;
  newDate: any;
  start: string;
  abgabe: string;
  type:string;
  number: string;
  amount: number;
  journey: any;
  bill: any;
  ows: any;
  edit: boolean = false;


  
  constructor(
    private billService: BillService, 
    private router: Router, 
    private authService: AuthService,
    //private billPreview: BillPreviewComponent,
  ){}

  billChooser(bill) {
      this.billService.bill = bill;
    }
  editItem(edit, event?) {
    console.log(event);
    this.edit = edit;
    
  }
  navigateToBilldata(){
    this.billService.navigateRechnungsDaten();
  }
  confirmPopUp(){
    console.log(this.billService.bill.journeys);
    if(
      this.billService.hasReNr === true && 
      this.billService.hasDate === true && 
      this.billService.hasVendor === true && 
      this.billService.hasCustomer === true &&
      this.billService.bill.journeys !== undefined
    ){
      this.billService.completeBill();
    } else {
      if(this.billService.bill.journeys === undefined){
        alert('Es sind noch keine Fahrten eingetragen!!!');
        this.router.navigate(['/Rechnungsdaten']);

      }else{
          alert('Es fehlen noch Daten!!!');
      }
      
    }
    this.inputPopup.hide();

  }
  
  confirmDelete(){
    this.billService.deleteJourney();
    this.billService.calculateAmount();
    this.deletePopup.hide();
    this.billService.calculateAmount();
  }
  cancelJourneyDelete(){
    this.billService.saveJourney(this.billService.tmpJourney);
    this.deletePopup.hide();
  }
  confirmDeleteCustomer(){
    this.billService.deleteCustomer();
    this.delCustomerPopup.hide();

  }
  modal(options){
    this.billService.uncloseInputs();
    this.inputPopup.show(options);
    
  }
  deleteDataPopup(){
    this.deletePopup.show(this.billService.deleteOptions());
  }
  deleteCustomerPopup(){
    this.delCustomerPopup.show(this.billService.deleteOptions());
  }

  
 

 /* saveJourney(){
    this.bill.journeys.push(this.journey);
    this.db.put(this.bill, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
    this.journey = new Journey();


  }

  getDatabase(){
    let getter = this.db.allDocs({include_docs: true, descending: true});
    getter.then((data) => {
      for(const bill of data.rows){
        this.billArray.push(bill.doc);
      }
      console.log(this.billArray);
      this.bill = this.billArray[0];
    });

  }

   
*/

}
