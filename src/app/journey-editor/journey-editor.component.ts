import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-journey-editor',
  templateUrl: './journey-editor.component.html',
  styleUrls: ['./journey-editor.component.css']
})
export class JourneyEditorComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
  }

}
