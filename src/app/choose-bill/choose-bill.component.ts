import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-choose-bill',
  templateUrl: './choose-bill.component.html',
  styleUrls: ['./choose-bill.component.css']
})
export class ChooseBillComponent implements OnInit {

  constructor(private billService : BillService) { }

  ngOnInit() {
  }

}
