import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';
import { PdfService } from "../services/pdf.service";
import { DomSanitizer } from "@angular/platform-browser";




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
  constructor(private billService: BillService, private pdfService: PdfService, private sanitizer: DomSanitizer) { }

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
  }

}
