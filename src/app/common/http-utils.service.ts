import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpUtilsService {
  private serverURL:String = this._global.serverURL;
  private httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }
  constructor(private _global:GlobalService, private _http: HttpClient) { }

  deleteDataFromCollectionWithId(elementIds:String[],collection_name:String):Observable<any> {
    if(collection_name){
      let apiURL = this.serverURL+'remove_items';
      return this._http.request('delete',apiURL,{
        headers: new HttpHeaders({'Content-type': 'application/json'}),
        body:{ elementIds, collection_name }
      }).pipe(
        map(res=> console.log(JSON.stringify(res)) ),
        catchError(this.handleError)
      );
    }
  }
  getDataFromCollection(collection_name:String):Observable<any[]>{
    if(collection_name){
      let apiURL = this.serverURL+'get_items/'+collection_name;
      return this._http.get<any[]>(apiURL).pipe(
        catchError(this.handleError)
      );
    }
  }
  insertDataToCollection(collection_name:String,data:any):Observable<any> {
    if(collection_name && Object.keys(data).length){
      let apiURL = this.serverURL+'save-'+collection_name,
          stringifiedData = JSON.stringify(data),
          headers = this.httpOptions;
      return this._http.post(apiURL,stringifiedData,headers).pipe(
        map(res=> console.log(JSON.stringify(res)) ),
        catchError(this.handleError)
      );
    }
  }
  getBookingInfoById(booking_id:string):Observable<any>{
    if(booking_id){
      let apiURL = this.serverURL+'get_booking_info/'+booking_id;
      return this._http.get<any>(apiURL).pipe(
        catchError(this.handleError)
      )
    }
  }
  modifyBookingInfo(booking_id:string,data:any):Observable<any>{
    if(booking_id && Object.keys(data).length){
      let apiURL = this.serverURL+'modify_booking_status/'+booking_id,
          stringifiedData = JSON.stringify(data),
          headers = this.httpOptions;
      return this._http.put(apiURL,stringifiedData,headers).pipe(
        catchError(this.handleError)
      );
    }
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
