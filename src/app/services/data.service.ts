import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loader: boolean = false;
  
  constructor(
    private http: HttpClient) { }

  public getAll(moduleName) {
    return this.http.get(environment.beUrl+moduleName).pipe(catchError(this.handleError));
  }

  public getByID(moduleName,id, nonlogin?) {
    return this.http.get(environment.beUrl+moduleName+'/'+id).pipe(catchError(this.handleError));
  }
  

  public handleError(error: HttpErrorResponse) {

    let errObj = {
      'status': error.status,
      'statusText': error.statusText,
      'message': error.error.message,
    };
    console.log(errObj);
    
    return throwError(JSON.stringify(errObj));
  }

}