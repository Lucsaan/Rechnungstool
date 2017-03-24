import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-journey-table',
  templateUrl: './journey-table.component.html',
  styleUrls: ['./journey-table.component.css']
})
export class JourneyTableComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
  }

}
