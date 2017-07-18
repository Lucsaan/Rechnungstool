import { Component, OnInit, ViewChild, Host } from '@angular/core';
import { BillService } from '../services/bill.service';
import { PdfService } from "../services/pdf.service";
import { DomSanitizer } from "@angular/platform-browser";
import {  Popup } from 'ng2-opd-popup';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.css']
})
export class BillPreviewComponent implements OnInit {

  @ViewChild('inputPopup') inputPopup: Popup;

  uri: any;
  
  constructor(
    private billService: BillService, 
    private pdfService: PdfService, 
    private sanitizer: DomSanitizer,
    private appComponent: AppComponent,  
  ) { }

  ngOnInit() {
    
  }

  

  optionsInputPopup(){
    return {
      header: "Bitte prüfen Sie die Informationen",
      color: "#944e11", // red, blue.... 
      widthProsentage: 30, // The with of the popou measured by browser width 
      animationDuration: 2, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Abschließen", // The text on your confirm button 
      cancleBtnContent: "Abbrechen", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    
    
  }

  

}
