import { Bill } from './../models/bill-model';
import { Journey } from './../models/journey-model';
import { Component, OnInit } from '@angular/core';


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
  journey: any = new Journey();
  bill: any =  new Bill();
  db : any = new PouchDB('bills');
  billArray : Array<Bill> = new Array<Bill>();
  rows: any;


  
  constructor(){
    this.bill.journeys = [];
    
    this.bill.reNr = '100';
    this.getDatabase();
    
    
  }

 

  saveJourney(){
    this.bill.journeys.push(this.journey);
    this.db.put(this.bill, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
    this.journey = new Journey();
    
    
  }

  getDatabase(){
    var getter = this.db.allDocs({include_docs: true, descending: true});
    getter.then((data) => {
      for(let bill of data.rows){
        this.billArray.push(bill.doc);
      }
      console.log(this.billArray);
      this.bill = this.billArray[0];
    });

  }

   billChooser(bill){
      this.bill = bill; 
    }

 
}
