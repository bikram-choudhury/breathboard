import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { TableListComponent } from './table-list/table-list.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { GlobalService } from './common/global.service';
import { SharedService } from './common/shared.service';
import { HttpUtilsService } from './common/http-utils.service';
import { DocumentClickDirective } from './directives/document-click.directive';
import { SearchInputComponent } from './common/search-input/search-input.component';
import { BookTableModalComponent } from './common/book-table-modal/book-table-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    CreateTableComponent,
    DocumentClickDirective,
    SearchInputComponent,
    BookTableModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    GlobalService,
    SharedService,
    HttpUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
