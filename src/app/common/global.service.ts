import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalService {
  floorType = [{
    key: 'floor-1',
    type: 'Floor 1'
  },{
    key: 'floor-2',
    type: 'Floor 2'
  },{
    key: 'floor-3',
    type: 'Floor 3'
  }];
  roomType = [{
    key: 'ac',
    type: 'AC'
  },{
    key: 'normal',
    type: 'Normal'
  },{
    key: 'self-service',
    type: 'Self Service'
  }];
  serverURL:String = "https://breathboard-api.now.sh/api/";
  databaseURL = "";
  resturantId:String = 'IRu1bE3naGTMzLt';

  constructor() { }

}
