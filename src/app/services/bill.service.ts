import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { DbService } from './db.service';
import { Vendor } from '../../models/vendor-model';
import { Customer } from '../../models/customer-model';
import { Observable } from 'rxjs/Rx';
import { Journey } from '../journey';
import { Bill } from '../bill';
import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as jsPdf from 'jspdf';
import { PdfService } from '../services/pdf.service';
import { AuthService } from "./auth.service";
import { Popup } from "ng2-opd-popup";
import { AngularFireAuth } from "angularfire2/auth";
import { Http, Jsonp } from "@angular/http";


@Injectable()
export class BillService {
  allDuration: string;
  allDistance: any;
  billDuration: string;
  billDistance: number = 0;
  lastJourneyDuration: string;
  lastJourneyDistance: any;

  bill: Bill = new Bill();

  customer: Customer;
  newCustomer: Customer = new Customer();
  dbVendor: FirebaseObjectObservable<Vendor>;
  vendor: Vendor;
  billVendor: Vendor;
  bills: FirebaseListObservable<Bill[]>;
  billsArray: Bill[];
  dbCustomers: FirebaseListObservable<Customer[]>;
  customers: Customer[] = [];
  journey: Journey = new Journey();
  tmpJourney: any;

  editModeJourney = false;
  editModeCustomer = false;
  editModeVendor = false;
  editModeBillNumber = false;
  editModeBillDate = false;
  addModeCustomer = false;
  hasReNr = false;
  hasDate = false;
  hasVendor = false;
  hasCustomer = false;
  showBillsArray = false;
  billWork = false;
  loggedIn = false;
  tmpChoice = false;
  tmpIndex: number;
  tmpCustomer: any;
  uidObserve: Observable<string>;
  private uid: string;
  private mapsApi: Observable<number>;
  private distance: Array<number> = [];

  
  
  private data: Observable<Array<Journey>>;

  totalAmountNetto: number = 0;
  totalAmountNettoString; string;
  totalAmountBrutto: string;
  taxAmount: string;

  email: string = "guest@rechnungstool.com";
  password: string = "guest123"; 

  constructor(
    private router: Router, 
    private dbService: DbService, 
    private af: AngularFireDatabase, 
    private pdfService: PdfService, 
    private auth: AuthService,
    private http : Http,
    private jsonp : Jsonp,
    ) {
    
     
  }

  afterLogin(){
        this.bills = this.af.list('/bills/' + this.auth.uid);
        this.dbVendor = this.af.object('/vendor/' + this.auth.uid);
        this.dbCustomers = this.af.list('/customers/' +  this.auth.uid);
        this.initiateBill();
        this.getBills();
        this.getCustomers();
        
       
    
  }
  logOut(){
    this.bills = null;
    this.dbVendor = null;
    this.dbCustomers = null;
    this.auth.logOut();
  }
   
  initiateBill() {
    this.journey = new Journey();
    this.bill = new Bill();
    this.vendor = new Vendor();
    this.bill.vendor = this.vendor;
    this.customer = new Customer();
  }

  getBills() {
    this.bills.subscribe(bills => {
            
      if (bills.length === 0) {
        console.log(this.bills);
        this.bills.push(new Bill());
        window.location.reload(false);
      }
      this.bill = bills[bills.length - 1];
      this.distanceJourney();
      this.calculationsOfBill();
      this.calculateAmount();
        this.uncloseInputs();
        if (this.bill.vendor === undefined) {
          console.log(this.bill.vendor);
          this.setVendor();
        }
      
      this.billsArray = bills;
      this.calculateAll();
      
      
      
      // if (this.bill.journeys === undefined){
      //   this.bill.journeys.push(this.journey);
      // }
    });
  }

  createNewBill(){
    this.vendor = this.bill.vendor;
    this.bill = new Bill();
    this.bill.vendor = this.vendor;
    this.bills.push(this.bill);
    this.showActualBill();
  }

  updateBill() {
    this.bills.update(this.bill.$key, this.bill);
  }
  getLastBill(){
    let subscription = this.bills.subscribe(bills => {
      this.bill = bills[bills.length -1];
    })
    subscription.unsubscribe();
  }

  changeBillNumber() {
    this.editModeBillNumber = true;
  }
  saveBillNumber(event = "Nix") {
    if(event === "Enter" || event === "click" || event === 'NumpadEnter'){
      this.editModeBillNumber = false;
      if(this.bill.reNr !== undefined){
        this.hasReNr = true;
      }else{
        this.hasReNr = false;
      }
      this.updateBill(); 
    }
     
    
  }
  changeBillDate() {
    this.editModeBillDate = true;
  }
  saveBillDate() {
    this.editModeBillDate = false;
    console.log(this.bill.billDate);
    if(this.bill.billDate !== undefined){
        this.hasDate = true;
      }else{
        this.hasDate = false;
      }
    this.updateBill();

  }
  previewBill(bill?) {
    if(bill !== undefined){
      this.bill = bill;
      this.navigateBillPreview('old');
    } else {
      this.getLastBill();
      this.navigateBillPreview('new');
    }
    
    
    this.calculateAmount();
    
  }
  completeBill() {
    if(this.bill.done){
      this.createPdf();
    }else {
      this.createPdf();
      this.getLastBill();
      this.bill.done = true;
      this.updateBill();
      this.createNewBill();
      
      

    }
  }


  updateVendor() {
    this.dbVendor.update(this.vendor);
  }

  setVendor() {
    this.bill.vendor = this.vendor;
    this.dbVendor.subscribe(vendor => {
      if (vendor.$value === null) {
        this.editModeVendor = true;
      }
      this.updateBill();
      this.updateVendor();
    })
  }

  saveVendor() {
    this.updateBill();
    this.vendor = this.bill.vendor;
    this.updateVendor();
    this.editModeVendor = false;
  }

  changeVendor() {

    if (this.bill.done === true) {
      return;
    }
    this.editModeVendor = true;
  }

  newJourney(){
    this.journey = new Journey();
    this.journey.end = '77815 Bühl';
  }

  saveJourney(journey?, i?) {
    if (this.bill.journeys === undefined) {
      this.bill.journeys = new Array<Journey>();
      this.nextJourney();
    }
    if (journey === undefined) {
      console.log('abspeichern');
      this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.journey.start +"&destinations=" + this.journey.end + "&key=AIzaSyAbhZay-bw6MM_Tp0PRzRynu5L8OiClw8k")
      .subscribe(data => {
        console.log('Was geht');
        let response = JSON.parse((data['_body']));
        console.log(response.rows[0].elements[0].distance);
        console.log(response.rows[0].elements[0].duration.value);
        this.journey.distance = (response.rows[0].elements[0].distance.value / 1000);
        this.journey.duration = (response.rows[0].elements[0].duration.value);
        this.bill.journeys.push(this.journey);
        this.nextJourney();
      });
    } else {
      journey.edit = false; 
      this.nextJourney();  
    }
    

  }
  nextJourney(){
      this.updateBill();
        this.journey = new Journey();
        this.tmpJourney = this.journey;
  }

  editJourney(journey) {
    journey.edit = true;
    this.tmpJourney = journey;
  }
  
  deleteJourney() {
      this.bill.journeys.splice(this.tmpIndex, 1);
      console.log('Journey removed!');
      this.updateBill();
      this.tmpIndex = null;
  }

  setCustomer(customer) {
    this.bill.customer = customer;
    console.log(customer.additive);
    this.updateBill();
    this.navigateRechnungsDaten();
  }

  saveNewCustomer() {
    this.bill.customer = this.newCustomer;
    this.dbCustomers.push(this.newCustomer);
    this.newCustomer = new Customer();
    this.getCustomers();
    this.updateBill();
    this.navigateRechnungsDaten();
  }
  getCustomers() {
    
    this.dbCustomers.subscribe(customers => {
      this.customers = customers;
      
    })
  }
  deleteCustomer() {
    this.dbCustomers.remove(this.tmpCustomer);
    this.tmpCustomer = null;
  }

  navigateRechnungsDaten() {
    this.router.navigate(['/Rechnungsdaten']);

  }
  navigateEmpfaenger() {
    this.router.navigate(['/Empfänger']);
  }
  navigateBillPreview(billType) {
    this.router.navigate(['/Vorschau']);
    if(billType === 'new') {
      this.showBillsArray = false;
    }
  }
  navigateTo(component) {
    this.router.navigate([component]);
  }

  showBills() {
    this.showBillsArray = true;
    this.navigateTo('/chooseBill');
  }
  showActualBill() {
    console.log(this.billsArray[this.billsArray.length - 1]);
    this.bill = this.billsArray[this.billsArray.length - 1];
    this.showBillsArray = false;
    this.navigateTo('/Rechnungsdaten');
  }

  createPdf() {
    this.pdfService.createPdf(this.bill);
  }

  calculateAmount(){
    
    this.totalAmountNetto = 0;
    if (this.bill.journeys !== undefined) {
      for (let journey of this.bill.journeys) {
        this.totalAmountNetto += parseFloat(journey.amount);
      }
    }
    this.totalAmountNettoString = (Math.round(this.totalAmountNetto * 100) / 100).toFixed(2);
    this.totalAmountBrutto = (Math.round(this.totalAmountNetto * 1.19 * 100) / 100).toFixed(2);
    this.taxAmount = (Math.round(this.totalAmountNetto * 0.19 * 100) / 100).toFixed(2);
  }

  deleteOptions(){
    return {
    header: "Eintrag wirklich löschen?",
      color: "#944e11", // red, blue.... 
      widthProsentage: 30, // The with of the popou measured by browser width 
      animationDuration: 2, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Löschen", // The text on your confirm button 
      cancleBtnContent: "Abbrechen", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
  }
  uncloseInputs(){
    if (this.bill.reNr !== undefined){
       this.hasReNr = true;
    }else this.hasReNr = false;

    if (this.bill.billDate !== undefined){
        this.hasDate = true;
        
    }else this.hasDate = false;
    if (this.bill.vendor !== undefined){
      this.hasVendor = true;
      
    }else this.hasVendor = false;
    if (this.bill.customer !== undefined){
      this.hasCustomer = true;
      
    }else this.hasCustomer = false;
  }

  allJourneysFalse(){
    console.log('Im in')
    for(let journey of this.bill.journeys){
      console.log(journey.edit);
      journey.edit = false;
      console.log(journey.edit);
      this.updateBill();
    }
  }

  distanceJourney(){
     this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Freiburg&destinations=Hamburg&key=AIzaSyAbhZay-bw6MM_Tp0PRzRynu5L8OiClw8k")
      .subscribe(data => {
        console.log('Was geht');
        let response = JSON.parse((data['_body']));
        console.log(response.rows[0].elements[0]);
        
      });
  }

  calculationsOfBill(){
    this.lastJourneyDistance = 0;
    this.billDistance = 0;
    if(this.bill.journeys[this.bill.journeys.length - 1].distance > 0){
       this.lastJourneyDistance = Math.floor(this.bill.journeys[this.bill.journeys.length - 1].distance);
      console.log(this.lastJourneyDistance);
    }
    let completeDuration = 0;
    for (let journey of this.bill.journeys){
      if(journey.distance > 0){
        this.billDistance += journey.distance;
      }
      if(journey.duration > 0){
        completeDuration += journey.duration;
      }

    }
    this.billDistance = Math.floor(this.billDistance);

     let i;
    
      let duration = completeDuration/60;
      let hours = Math.floor(duration/60);
      if(hours < 2){
        i = 'Stunde';
      }else {
        i = 'Stunden';
      }
      let minutes = Math.floor(duration%60);
      this.billDuration = hours + ' ' + i + ' ' + minutes + ' Minuten';
      console.log(this.billDuration);
    

    console.log(this.billDistance);
    let h: any;
    if(this.bill.journeys[this.bill.journeys.length - 1].duration > 0){
      let duration = this.bill.journeys[this.bill.journeys.length - 1].duration/60;
      let hours = Math.floor(duration/60);
      if(hours < 2){
        h = 'Stunde';
      }else {
        h = 'Stunden';
      }
      let minutes = Math.floor(duration%60);
      this.lastJourneyDuration = hours + ' ' + h + ' ' + minutes + ' Minuten';
      console.log(this.lastJourneyDuration);
    }

    
  }
  
  calculateAll(){
    
    
    this.allDistance = 0;
    let duration = 0;
    for(let bill of this.billsArray){
      console.log(bill);
      for (let journey of bill.journeys){
        if(journey.distance > 0){
          this.allDistance += journey.distance;
        }
        if(journey.duration > 0){
          duration += journey.duration;
        }

      }
    }
    this.allDistance = Math.floor(this.allDistance);
    let j;
    console.log(duration);
    let days =  Math.floor(duration/60/60/24);
    let hours = Math.floor(duration/60/60);
      if(hours < 2){
        j = 'Stunde';
      }else {
        j = 'Stunden';
      }
      let minutes = Math.floor((duration/60)%60);
      this.allDuration = days + ' Tage ' + hours + ' ' + j + ' ' + minutes + ' Minuten';

    
    
  }

   
}
