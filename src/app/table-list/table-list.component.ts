import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer } from '@angular/core';
import { HttpUtilsService } from './../common/http-utils.service';
import { BookTableModalComponent } from './../common/book-table-modal/book-table-modal.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  tableList:any;
  tableListWithBookingId:any;
  filteredTableList:any;
  formatedTableList:any;
  roomTypeList:any[];
  error:any;
  header:string;
  tableId:string;
  booking_info:object;
  
  @ViewChild('tableEl') tableEl:ElementRef;

  @Output() eventEmiitedFromRouterComponent = new EventEmitter<String>()
  @ViewChild(BookTableModalComponent) _modal;

  constructor(private _httpService: HttpUtilsService, private renderer: Renderer) { }

  ngOnInit() {
    this.eventEmiitedFromRouterComponent.emit('hidden');
    this._httpService.getDataFromCollection('tables')
    .subscribe(
      (tables:any) => {
        let code = tables.code;
        if(code === 0){
          this.tableList = tables && tables.list || [];
          this.filteredTableList = this.tableList;
          this.tableListWithBookingId = tables.tableStatus_withBookingId || [];
          this.formatTables(this.filteredTableList);
        }
      },
      error => this.error = error
    )
  }
  handelbookingSatatus($event:any){
    if($event.status){
      Array.from(document.querySelectorAll('.table-block .list-container .label')).forEach(el =>{
        if(el.getAttribute('table_id') === this.tableId){
          el.classList.remove('dirty','running','booked');
          if($event.status==='free' && el.getAttribute('booking_id')){
            el.setAttribute('booking_id','');
          } else {
            el.classList.add($event.status);
            el.setAttribute('booking_id',$event.currentBookingId);           
          }
        }
        if($event.prevBookingId === el.getAttribute('booking_id')){
          el.classList.remove('dirty','running','booked');
          el.setAttribute('booking_id','');            
        }
      });
    }
    if($event.action === 'reset'){
      this.header = '';
      this.tableId = '';
    }
  }
  filterTableList(search:string){
    console.log(search);
    this.filteredTableList = search?(
      this.tableList.filter(el=> el.name.toLowerCase().indexOf(search.toLowerCase()) >-1 )
    ):this.tableList;
    this.formatTables(this.filteredTableList);
  }
  formatTables(tableList:any){
    let formatedTables = {};
    tableList && tableList.length && tableList.forEach(element => {
      if(!element.rType){
        return;
      }
      if(!formatedTables[element.rType]){
        formatedTables[element.rType] = [];
      }
      
      let booking = this.tableListWithBookingId.find(el => el.tId === element._id ),
          adhoc = {
            'name': element.name,
            'ftype': element.fType,
            'rtype': element.rType,
            'tId': element._id,
            'status': booking && booking.status || '',
            'booking_id': booking && booking._id || ''
          }
      formatedTables[element.rType].push(adhoc);

    });
    this.formatedTableList = formatedTables;
    this.roomTypeList = Object.keys(this.formatedTableList);
  }

  processTable($event:any,table:any){
    if($event.currentTarget.getAttribute('booking_id')){
      this._httpService.getBookingInfoById($event.currentTarget.getAttribute('booking_id'))
      .subscribe(res => {
        console.log(res);
        if(res.code==0){
          this.booking_info = res.info[0];
        }
        this.header = table.name;
        this.tableId = table.tId;
      })
    } else {
      this.header = table.name;
      this.tableId = table.tId;
      this.booking_info = null;
    }
    
  }

}
