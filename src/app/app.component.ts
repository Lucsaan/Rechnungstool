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
  @ViewChild('spesenPopup') spesenPopup: Popup;
  
  
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
  /* setSpesenPopup(spesenOptions){
    this.billService.spesenPopup = true;
    this.spesenPopup.show(spesenOptions);
    
  } */

  setSpesenPopup(journey, bill){
      this.billService.uhrzeit_von = journey.uhrzeit_von;
      this.billService.uhrzeit_bis = journey.uhrzeit_bis;
      this.billService.spesen_betrag = journey.spesen_betrag;
      this.billService.spesenJourney = JSON.parse(JSON.stringify(journey));
      this.billService.spesenBill = JSON.parse(JSON.stringify(bill));
    this.billService.spesenPopup = true;
    this.spesenPopup.show(this.spesenEditOptions());
  }

  spesenEditOptions(){
    return {
    header: "Spesen",
      color: "#944e11", // red, blue.... 
      widthProsentage: 30, // The with of the popou measured by browser width 
      animationDuration: 2, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Spesen eintragen", // The text on your confirm button 
      cancleBtnContent: "Abbrechen", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
  }

  confirmSpesen(){
    console.log('Spesen werden gespeichert');
    if(this.billService.billsArray !== undefined) {
        for(let bill of this.billService.billsArray) {
            if(bill.reNr === this.billService.spesenBill.reNr) {
                console.log('Bill gefunden', bill);
                for(let journey of bill.journeys) {
                    if(journey._id === this.billService.spesenJourney._id) {
                        journey.uhrzeit_von = this.billService.uhrzeit_von;
                        journey.uhrzeit_bis = this.billService.uhrzeit_bis;
                        journey.spesen_betrag = this.billService.spesen_betrag;
                        this.billService.updateBill(bill);
                        this.billService.spesenPopup = false;
                    }
                }
            }
        }
    }
    // this.billService.tmpJourney.uhrzeit_von = this.billService.uhrzeit_von;
    // this.billService.tmpJourney.uhrzeit_bis = this.billService.uhrzeit_bis;
    // this.billService.saveJourney(this.billService.tmpJourney);
    this.spesenPopup.hide();
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
