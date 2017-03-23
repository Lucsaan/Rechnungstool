import { BillService } from './bill.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule} from '@angular/material';
import { MdDataTableModule } from 'ng2-md-datatable';
import { DataTableModule} from 'ng2-data-table';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as PouchDB from 'pouchdb';


import { AppComponent } from './app.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()


  ],
  providers: [BillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
