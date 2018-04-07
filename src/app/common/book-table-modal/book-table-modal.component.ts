import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpUtilsService } from './../http-utils.service';
import { GlobalService } from './../global.service';


@Component({
  selector: 'book-table-modal',
  templateUrl: './book-table-modal.component.html',
  styleUrls: ['./book-table-modal.component.scss']
})
export class BookTableModalComponent implements OnInit,OnChanges {
  
  closeResult: string;
  selectedMoment = new Date();
  paxNumbers = Array(10);
  step:string = 'one';
  selectedPax:number = 0;
  bookingBtnText:string = "Next Step";
  confirmation_icon:string = '';
  booking_status: boolean = false;
  booking_block:boolean = false;
  cDetail = {
    name: '',
    email:'',
    phone:''
  };
  cvalidation = {
    name: false,
    email:false,
    phone:false,
    pax: false,
    date: false
  };
  bookingId:string;
  booking_from:Date;
  booking_to:Date;
  modalReferance:any;

  @Input() header:string;
  @Input() tableId:string;
  @Input() booking_info:any;

  @Output() resetModalProperty: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') content;

  constructor(
    private _modal: NgbModal,
    private _toastr: ToastrService,
    private _http: HttpUtilsService,
    private _global: GlobalService
  ) { }

  ngOnInit() {
    this.resetProperties();
  }
  ngOnChanges(){
    if(this.header && this.tableId){
      setTimeout(()=>{
        this.resetProperties();
        this.booking_block = this.booking_info && Object.keys(this.booking_info).length ? true : false;
        if(this.booking_block){
          let obj = this.booking_info;
          this.booking_from = new Date(obj.bDt);
          this.booking_to = new Date(obj.bDt + 30*60000);
        }
        this.bookingId = '';
        this.open(this.content);
      },100)
    }

  }
  saveBooking($event:any){
    let saveStatus = $event.target.classList.contains('submitted');
    if(saveStatus){
      let customer = this.cDetail;
      if(!customer.name) {
        this.cvalidation.name = true;
        return;
      }
      if(!customer.phone) {
        this.cvalidation.phone = true;        
        return;
      }
      if(!customer.email) {
        this.cvalidation.email = true;        
        return;
      }
      let data = {};
      Object.assign(data,this.cDetail);
      data['status'] = 'booked';
      data['bDt'] = this.selectedMoment.getTime();
      data['pax'] = this.selectedPax;
      data['tId'] = this.tableId;
      data['resturantId'] = this._global.resturantId;
      this.bookingId ? data['bookingId'] = this.bookingId : '';
      console.log(data);
      this._http.insertDataToCollection('bookings',data)
      .subscribe(res=>{
        if(res.code === 0){
          this._toastr.success(res.message,'',{
            closeButton:true
          });
          this.resetModalProperty.emit({status: 'booked',prevBookingId: this.bookingId,currentBookingId:res.bookingId});
          this.step = 'three';
          this.bookingId = res.bookingId;
          this.bookingBtnText = '';
          this.confirmation_icon = 'assets/success-icon.png';
          this.booking_status = true;
        } else if(res.code === 1){
          this.step = 'three';
          this.bookingId = res.bookingId;
          this.confirmation_icon = 'assets/failed-icon.png';
          this.bookingBtnText = 'Proceed anyway';
          this.booking_status = false;
        } else {
          this._toastr.error(res.message,'Error',{
            closeButton:true
          });
        }

      })
    } else {
      if(!this.selectedPax){
        this.cvalidation.pax = true;
        return;
      }
      if(!this.selectedMoment){
        this.cvalidation.date = true;
        return;
      }
      this.step = 'two';
      this.bookingBtnText = 'Submit';
    }
    
  }
  savePax(pax:number){
    this.selectedPax = pax;
  }
  processBooking(status:string,bookingId:string){
    if(status){
      this._http.modifyBookingInfo(bookingId,{status:status})
      .subscribe(res => {
        if(res.code === 0){
          this.resetModalProperty.emit({action:'reset',status: status,currentBookingId:bookingId});
          this.modalReferance.close();
        }
      })
    }
  }
  open(content) {
    this.modalReferance = this._modal.open(content,{ windowClass: 'w-400' });
    this.modalReferance.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.header = '';
    this.tableId = '';
    this.resetProperties();
    this.resetModalProperty.emit({action:'reset'});

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  resetProperties(){
    
    this.selectedPax = 0;
    this.bookingBtnText = "Next Step";
    this.step = 'one';
    this.selectedPax = 0;
    this.confirmation_icon = '';
    this.booking_status = false;
    this.cDetail = { name: '', email:'', phone:'' };
    this.cvalidation = { name: false, email:false, phone:false, pax:false, date: false };
    this.bookingId = '';
    this.selectedMoment = new Date();
    
  }
}
