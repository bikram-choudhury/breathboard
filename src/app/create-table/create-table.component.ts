import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from './../common/global.service';
import { SharedService } from './../common/shared.service';
import { HttpUtilsService } from './../common/http-utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {
  floorTypeList:any = this._global.floorType;
  roomTypeList:any = this._global.roomType;
  formData = {
    tableName: '',
    roomType: '',
    floorType: ''
  }
  emitdata:String = 'js-create-table';
  tableId: any;
  tableList:any;
  filteredTables:any;
  error:any;
  constructor(
    private _global:GlobalService,
    private _shared:SharedService,
    private _httpService:HttpUtilsService,
    private _toastr: ToastrService
  ) {
    _shared.observableIntakeSource.subscribe((inlet:String)=>{
      if(inlet==this.emitdata){
        this.submitTableCreationForm();
      }
    })
  }
  
  ngOnInit() {
    this._shared.emitSourceData(this.emitdata);
    this._httpService.getDataFromCollection('tables')
    .subscribe(
      (tables:any) => {
        let code = tables.code;
        if(code === 0){
          this.tableList = tables && tables.list || [];
          this.filteredTables = this.tableList;
          this.sortTables();
        }
      },
      error => this.error = error
    )
  }
  removeTable(tableId:String):void {
    if(tableId){
      this._httpService.deleteDataFromCollectionWithId([tableId],'tables')
      .subscribe((response:any)=>{
        let code = response.code
        if(code===0){
          this._toastr.success("Selected table has been removed","Success",{
            closeButton:true
          })
          this.tableList =this.tableList.filter(el=> [tableId].indexOf(el._id) === -1 );
          this.filteredTables = this.tableList;          
        }
      })
    }
  }
  editTable(tableId:String):void {
    if(tableId){
      let field = this.tableList.find(el => el._id === tableId);
      this.formData = {
        tableName: field.name,
        roomType: field.rType,
        floorType: field.fType
      }
      this.tableId = tableId;
    }
  }
  submitTableCreationForm(){   
    if(!this.formData.tableName){
      this._toastr.error('Table name is required','Error',{
        closeButton:true
      });
      return;
    }
    if(!this.formData.roomType){
      this._toastr.error('Room type is required','Error',{
        closeButton:true
      });
      return;
    }
    if(!this.formData.floorType){
      this._toastr.error('Floor type is required','Error',{
        closeButton:true
      });
      return;
    }

    let data = {
      name: this.formData.tableName,
      rType: this.formData.roomType,
      fType: this.formData.floorType,
      resturantId: this._global.resturantId,
      tId: this.tableId
    }
    this._httpService.insertDataToCollection('tables',data)
    .subscribe(
      res => {
        if(res.code === 0){
          this.tableList = this.tableList.filter(el => el._id!=this.tableId)
          data['_id'] = res.tableId
          delete data['resturantId'];
          delete data['tId'];
          this.tableList.push(data);
          this.sortTables();
          this.filteredTables = this.tableList;          
          this._toastr.success(res.message,'',{
            closeButton:true
          });
        } else {
          this._toastr.error(res.message,'Error',{
            closeButton:true
          });
        }
        this.clearFields();        
      },
      error => {
        this._toastr.error('Error','',{
          closeButton:true
        });
        console.log(error);
        
      }
    )
  }
  clearFields(){
    this.tableId = '';
    this.formData = {
      tableName: '',
      roomType: '',
      floorType: ''
    } 
  }
  sortTables(){
    this.tableList.sort((st,lt)=>{
      let stName = st.name.toUpperCase(),
          ltName = lt.name.toUpperCase();
      if(stName < ltName){
        return -1;
      } else if(stName > ltName) {
        return 1;
      }
      return 0; //equal name
    })
  }
  filterTables(search:String){
    console.log(search);
    this.filteredTables = search?(
      this.tableList.filter(el=>el.name.toLowerCase().indexOf(search.toLowerCase() ) > -1 )
    ):this.tableList;
  }
}
