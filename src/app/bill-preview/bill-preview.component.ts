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
  constructor(private billService: BillService, private pdfService : PdfService, private sanitizer : DomSanitizer) { }

  ngOnInit() {
    let bill = this.billService.bill;
    this.uri = this.pdfService.createPdf(bill);
    console.log(this.uri);

  }

}
