import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-vendor-editor',
  templateUrl: './vendor-editor.component.html',
  styleUrls: ['./vendor-editor.component.css']
})
export class VendorEditorComponent implements OnInit {

    
  constructor(private billService : BillService) { }

  ngOnInit() {
  }
  
  nextTab(event, field){

    let vendorName = document.getElementById("vendorName");
    let vendorStreet = document.getElementById("vendorStreet");
    let vendorCity = document.getElementById("vendorCity");
    let vendorSave = document.getElementById("vendorSave");

    if(event === "Enter"){
      if(field === "name"){
        vendorStreet.focus();
      }else if (field === 'street'){
        vendorCity.focus();
      }else {
        vendorSave.click();
      }
    }

  }
  

}
