import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from '../services/bill.service';
import { Popup } from 'ng2-opd-popup';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-journey-editor',
  templateUrl: './journey-editor.component.html',
  styleUrls: ['./journey-editor.component.css']
})
export class JourneyEditorComponent implements OnInit {

  constructor(private billService: BillService, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  setSpesenbetrag(amount){
    if(amount < 0){
      this.billService.journey.spesen_betrag = 0;
      this.billService.journey.uhrzeit_von = 0;
      this.billService.journey.uhrzeit_bis = 0;
      
      return;
    }
    this.billService.journey.spesen_betrag = amount;
  }




}
