import { BillService } from './services/bill.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
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


  
  constructor(private billService: BillService, private router: Router, private authService: AuthService){

    
    
    /*this.bill.journeys = [];
    
    this.bill.reNr = '100';
    this.getDatabase();*/


  }
  billChooser(bill) {
      this.billService.bill = bill;
    }
  editItem(edit, event?) {
    console.log(event);
    this.edit = edit;
    /*if (!edit) {
      this.billService.saveJourney();
    }*/
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
      this.billService.createPdf();
    } else {
      if(this.billService.bill.journeys === undefined){
        alert('Es sind noch keine Fahrten eingetragen!!!');
      }else{
          alert('Es fehlen noch Daten!!!');
      }
      
    }
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
