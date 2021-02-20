import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { VaccData } from './vaccData';
import { DataTest } from './data';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private dataUrl = 'http://localhost:3000/vaccination';  // URL to web api
  private testDataUrl = 'http://localhost:3000/vaccination/testdata';  // URL to web api

  public testDataList: DataTest[];
  public testData: DataTest;
  public dataString: String;

  getTestData(): Observable<HttpResponse<DataTest>> {
    return this.http.get<DataTest>(
      this.testDataUrl, { observe: 'response' });
  }

  getTestData2(): Observable<DataTest> {
    this.log('Service getTestData2 called');
    return this.http.get<DataTest>(this.testDataUrl)
      .pipe(
        tap(_ => this.log('fetched getTestData2')),
        catchError(this.handleError<DataTest>('getTestData2', null))
      );
  }

  /** GET heroes from the server */
  getData(): Observable<VaccData> {
    return this.http.get<VaccData>(this.dataUrl)
      .pipe(
        tap(_ => this.log('fetched getData')),
        catchError(this.handleError<VaccData>('getData', null))
      );
  }

  /** Log a message with the MessageService */
  public log(message: string) {
    this.messageService.add(`VaccinationService: ${message}`);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}

