import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";
import { Bill } from "../bill";
import {Journey} from '../journey';
import {SpesenPreviewComponent} from '../spesen-preview/spesen-preview.component';
import {SpesenService} from '../services/spesen.service';
import {forEach} from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-spesentable',
  templateUrl: './spesentable.component.html',
  styleUrls: ['./spesentable.component.css']
})
export class SpesentableComponent implements OnInit {
    billsCopy: any;

  constructor(
      private billService: BillService, private spesenPreview: SpesenPreviewComponent,
      private spesenService: SpesenService
  ) {
      this.billsCopy = billService.billsArray.slice(0);
      for(let bills of this.billsCopy) {

      }
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
