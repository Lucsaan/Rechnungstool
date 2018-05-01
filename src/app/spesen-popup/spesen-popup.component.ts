import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-spesen-popup',
  templateUrl: './spesen-popup.component.html',
  styleUrls: ['./spesen-popup.component.css']
})
export class SpesenPopupComponent implements OnInit {

  constructor(private billService : BillService) { }

  ngOnInit() {
  }

  setSpesenbetrag(amount){
        if(amount < 0){
            this.billService.spesen_betrag = 0;
            this.billService.uhrzeit_von = 0;
            this.billService.uhrzeit_bis = 0;
            return;
        }
        this.billService.spesen_betrag = amount;
    }
}
