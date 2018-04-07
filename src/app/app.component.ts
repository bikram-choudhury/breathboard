import { Component,OnChanges,AfterContentChecked,OnInit,DoCheck,AfterContentInit,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import { SharedService } from './common/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// implements AfterContentChecked, OnInit,OnChanges,DoCheck,AfterContentInit,AfterViewInit,AfterViewChecked,OnDestroy
export class AppComponent {
  title:String = 'BreathBoard';
  saveBtnFor: String;
  logo: String = 'assets/logo.png';
  sidebarToggle: boolean = false;
  constructor(private _shared:SharedService){
    _shared.observableSource.subscribe((response:String)=>this.saveBtnFor=response);
  }
  /*ngAfterContentChecked(){
    console.log('ngAfterContentChecked');
    // this.sidebarToggle = false;
  }
  ngOnInit(){
    console.log('ngOnInit');
  }
  ngOnChanges(){
    console.log("OnChanges");
  }
  ngDoCheck(){
    console.log("ngDoCheck");
  }
  ngAfterContentInit(){
    console.log("ngAfterContentInit");
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }
  ngAfterViewChecked(){
    console.log("ngAfterViewChecked");
  }
  ngOnDestroy(){
    console.log("ngOnDestroy");
  }*/
  saveDetails(actionFor:String) {
    this._shared.intakeSourceData(actionFor);
  }
  toggleSidenav(event):void {
    event.stopPropagation();
    this.sidebarToggle = !this.sidebarToggle;  
  }
  collapseSidenav(event):void {
    if(!event.currentTarget.classList.contains('active')){
      this.sidebarToggle = !this.sidebarToggle;
    }
  }
  
}
