import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-bill-data',
  templateUrl: './bill-data.component.html',
  styleUrls: ['./bill-data.component.css']
})
export class BillDataComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
  }

}
