import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.css']
})
export class BillsTableComponent implements OnInit {

  constructor(private billService : BillService) { }

  ngOnInit() {
  }

}
