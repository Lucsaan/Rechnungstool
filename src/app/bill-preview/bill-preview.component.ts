import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';
import { PdfService } from "../services/pdf.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Popup} from 'ng2-opd-popup';




@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.css']
})
export class BillPreviewComponent implements OnInit {
  uri: any;
  totalAmountNetto: number = 0;
  totalAmountNettoString; string;
  totalAmountBrutto: string;
  taxAmount: string;
  constructor(private billService: BillService, private pdfService: PdfService, private sanitizer: DomSanitizer, private popup : Popup) { }

  ngOnInit() {
    let bill = this.billService.bill;
    if (this.billService.bill.journeys !== undefined) {
      for (let journey of this.billService.bill.journeys) {
        this.totalAmountNetto += parseFloat(journey.amount);
      }
    }

    this.totalAmountNettoString = (Math.round(this.totalAmountNetto * 100) / 100).toFixed(2);
    this.totalAmountBrutto = (Math.round(this.totalAmountNetto * 1.19 * 100) / 100).toFixed(2);
    this.taxAmount = (Math.round(this.totalAmountNetto * 0.19 * 100) / 100).toFixed(2);

    this.popup.options = {
      header: "Es fehlen noch folgende Informationen:",
      color: "#944e11", // red, blue.... 
      widthProsentage: 30, // The with of the popou measured by browser width 
      animationDuration: 2, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Abschließen", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    
  }

  modal(){
    this.popup.show(this.popup.options);
  }

  

}
