import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";
import { Bill } from "../bill";
import {Journey} from '../journey';
import {SpesenPreviewComponent} from '../spesen-preview/spesen-preview.component';
import {SpesenService} from '../services/spesen.service';
import {forEach} from '@angular/router/src/utils/collection';
import {AppComponent} from '../app.component';



@Component({
  selector: 'app-spesentable',
  templateUrl: './spesentable.component.html',
  styleUrls: ['./spesentable.component.css']
})
export class SpesentableComponent implements OnInit {

  constructor(
      private billService: BillService, private spesenPreview: SpesenPreviewComponent,
      private spesenService: SpesenService, private appComponent: AppComponent
  ) {
      this.spesenService.bills = JSON.parse(JSON.stringify(billService.billsArray));
  }

  ngOnInit() {
  }

  selectJourney(journey, billNr) {
      journey.selected ? journey.selected = false : journey.selected = true;
      if(journey.selected) {
          this.spesenService.addJourney(journey, billNr);
      }else {
          this.spesenService.removeJourney(journey);
      }
  }
}
