import { BillService } from './services/bill.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule} from '@angular/material';
import { MdDataTableModule } from 'ng2-md-datatable';
import { DataTableModule} from 'ng2-data-table';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as PouchDB from 'pouchdb';
import { DbService } from './services/db.service';


import { AppComponent } from './app.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { JourneyEditorComponent } from './journey-editor/journey-editor.component';
import { JourneyTableComponent } from './journey-table/journey-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerEditorComponent,
    JourneyEditorComponent,
    JourneyTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()


  ],
  providers: [BillService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
