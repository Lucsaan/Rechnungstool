import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { DbService } from './db.service';
import { Vendor } from '../../models/vendor-model';
import { Customer } from '../../models/customer-model';
import { Observable } from 'rxjs/Rx';
import { Journey } from '../journey';
import { Bill } from '../bill';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as jsPdf from 'jspdf';
import { PdfService } from '../services/pdf.service';
import { AuthService } from "./auth.service";


@Injectable()
export class BillService {
  //uid: string = "qHqVpwIeyngj9CAqWXuo4M8ki6O2";
  uid: string = "C3UEcR6q1UgEOmotFxSOltUTBnc2";

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

  editModeJourney = false;
  editModeCustomer = false;
  editModeVendor = false;
  editModeBillNumber = false;
  editModeBillDate = false;
  addModeCustomer = false;
  showBillsArray = false;
  billWork = false;
  loggedIn = false;
  private index: number;
  private data: Observable<Array<Journey>>;

  constructor(private router: Router, private dbService: DbService, private af: AngularFireDatabase, private pdfService: PdfService, private auth: AuthService) {
    
    
    this.bills = af.list('/bills/' + this.uid);
    this.dbVendor = af.object('/vendor/' + this.uid);
    this.dbCustomers = af.list('/customers/' + this.uid);
    this.initiateBill();
    this.getBills();
    this.getCustomers();
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
        console.log(bills.length);
            
      if (bills.length === 0) {
        this.bills.push(new Bill());
      }
      this.bill = bills[bills.length - 1];
      this.billsArray = bills;
      console.log(this.billsArray);
      if (this.bill.vendor === undefined) {
        this.setVendor();
      }
    });
  }

  createNewBill(){
    this.vendor = this.bill.vendor;
    this.bill = new Bill();
    this.bill.vendor = this.vendor;
    this.bill.billDate = new Date();
    this.bills.push(this.bill);
    this.showActualBill();
  }

  updateBill() {
    this.bills.update(this.bill.$key, this.bill);
  }

  changeBillNumber() {
    this.editModeBillNumber = true;
  }
  saveBillNumber() {
    this.editModeBillNumber = false;
    this.updateBill();
  }
  changeBillDate() {
    this.editModeBillDate = true;
  }
  saveBillDate() {
    this.editModeBillDate = false;
    this.updateBill();
  }
  previewBill(bill?) {
    if(bill !== undefined){
      this.bill = bill;
    }
    this.navigateBillPreview();
  }
  completeBill() {
    if(this.bill.done){
      this.createPdf();
    }else {
      this.createPdf();
      this.bill.done = true;
      this.updateBill();
      this.createNewBill();
      
      

    }
  }


  updateVendor() {
    this.dbVendor.update(this.vendor);
    console.log(this.vendor);
  }

  setVendor() {
    this.bill.vendor = this.vendor;
    this.dbVendor.subscribe(vendor => {
      if (vendor.$value === null) {
        this.editModeVendor = true;
      }
      console.log(vendor);
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

  saveJourney(journey?) {
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

  }

  editJourney(journey) {
    journey.edit = true;
  }

  deleteJourney(index) {
    this.bill.journeys.splice(index, 1);
    console.log('Journey removed!');
    this.updateBill();
  }

  setCustomer(customer) {
    this.bill.customer = customer;
    console.log(customer);
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
  deleteCustomer(customer) {
    this.dbCustomers.remove(customer);
  }

  navigateRechnungsDaten() {
    this.router.navigate(['/Rechnungsdaten']);

  }
  navigateEmpfaenger() {
    this.router.navigate(['/Empfänger']);
  }
  navigateBillPreview() {
    this.router.navigate(['/Vorschau']);
  }
  navigateTo(component) {
    this.router.navigate([component]);
  }

  showBills() {
    this.showBillsArray = true;
    this.navigateTo('/chooseBill');
  }
  showActualBill() {
    this.bill = this.billsArray[this.billsArray.length - 1];
    this.showBillsArray = false;
    this.navigateTo('/Rechnungsdaten');
  }

  createPdf() {
    /*console.log(this.bill.journeys[0].date);
    this.navigateBillPreview();*/
    this.pdfService.createPdf(this.bill);    
  }








}
