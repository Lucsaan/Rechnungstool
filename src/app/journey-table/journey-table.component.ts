import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from '../services/bill.service';
import { Popup } from "ng2-opd-popup";
import { AppModule } from '../app.module';
import { AppComponent } from "../app.component";



@Component({
  selector: 'app-journey-table',
  templateUrl: './journey-table.component.html',
  styleUrls: ['./journey-table.component.css']
})
export class JourneyTableComponent implements OnInit {

  @ViewChild('deletePopup') deletePopup: Popup;

  constructor(
    private billService: BillService,
    private appComponent: AppComponent,  
  ) { 
    
  }

  ngOnInit() {
    
  }

  deleteJourney(index){
    this.billService.tmpIndex = index;
    this.appComponent.deleteDataPopup();
    
  }

}
