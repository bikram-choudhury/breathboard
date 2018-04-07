import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {
  private emitSource = new BehaviorSubject<String>("");
  observableSource = this.emitSource.asObservable();

  private intakeSource = new BehaviorSubject<String>("");
  observableIntakeSource = this.intakeSource.asObservable();
  constructor() {}
  emitSourceData(sendSource: String){
    this.emitSource.next(sendSource);
  }
  intakeSourceData(getsource:String){
    this.intakeSource.next(getsource);
  }
}
