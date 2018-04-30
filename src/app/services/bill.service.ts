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


@Injectable()
export class BillService {

  

  bill: Bill = new Bill();

  customer: Customer;
  newCustomer: Customer = new Customer();
  dbVendor: FirebaseObjectObservable<Vendor>;
  vendor: Vendor;
  billVendor: Vendor;
  bills: FirebaseListObservable<Bill[]>;
  billsArray: any;
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
  BillsArrayVisible = false;
  journeysTableVisible = true;
  spesenVisible = false;
  billWork = false;
  loggedIn = false;
  tmpChoice = false;
  tmpIndex: number;
  tmpCustomer: any;
  uidObserve: Observable<string>;
  private uid: string;
  spesenPopup: boolean = false;
  uhrzeit_von: number;
  uhrzeit_bis: number;

  
  
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
    
    ) {}

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
      this.calculateAmount();
        this.uncloseInputs();
        if (this.bill.vendor === undefined) {
          console.log(this.bill.vendor);
          this.setVendor();
        }
      
      this.billsArray = bills;
      
      
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
    this.spesenVisible = false;
    this.BillsArrayVisible = false;
    this.journeysTableVisible = true;
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
    }
    if (journey === undefined) {
      this.bill.journeys.push(this.journey);
    } else {
      journey.edit = false;   
    }
    this.updateBill();
    this.journey = new Journey();
    this.tmpJourney = this.journey;

  }

  editJourney(journey) {
    if(this.spesenPopup !== true){
      journey.edit = true;
    }
    console.log(journey);
    this.tmpJourney = journey;
    this.tmpJourney.uhrzeit_von !== undefined ? this.uhrzeit_von = this.tmpJourney.uhrzeit_von : this.uhrzeit_von = 0;
    this.tmpJourney.uhrzeit_bis !== undefined ? this.uhrzeit_bis = this.tmpJourney.uhrzeit_bis : this.uhrzeit_bis = 0;
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
      this.BillsArrayVisible = false;
    }
  }
  navigateTo(component) {
    this.router.navigate([component]);
  }

  showBills() {
    this.spesenVisible = false;
    this.journeysTableVisible = false;
    this.BillsArrayVisible = true;
    this.navigateTo('/chooseBill');
  }
  showActualBill() {
    this.bill = this.billsArray[this.billsArray.length - 1];
    this.BillsArrayVisible = false;
    this.spesenVisible = false;
    this.journeysTableVisible = true;
    this.navigateTo('/Rechnungsdaten');
  }

  showSpesen() {
    console.log('Was geht?');
    this.BillsArrayVisible = false;
    this.journeysTableVisible = false;
    this.spesenVisible = true;

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
}
