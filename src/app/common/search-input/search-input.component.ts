import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  _search:string;
  constructor() { }

  ngOnInit() { }

  @Output()
  searchValue:EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set search(value:string){
    this._search = value;
    this.searchValue.emit(this._search)
  }
  get search(){
    return this._search;
  }

}
