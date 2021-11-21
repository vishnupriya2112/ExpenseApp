import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BudgetItem,Item } from 'src/app/shared/models/budget-item.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  readonly ROOT_URL;
  constructor(private http:HttpClient) { 
    this.ROOT_URL='http://localhost:3000';

  }

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
  get(uri:string,id:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${id}`);
  }
  post(uri:string,payload:string){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
  }
  delete(uri:string,email:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}/${email}`);
  }
  getUserProfile(uri:string,email:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${email}`);
  }
  showitem(email:string){
    return this.http.get(`${this.ROOT_URL}/showitem/${email}`);
  }
  // showitem(email:string):Observable<BudgetItem[]>{
  //   return this.http.get<BudgetItem[]>(`${this.ROOT_URL}/showitem/${email}`).pipe(
  //     tap(_ => this.log('Item Fetched')),
  //     catchError(this.handleError<BudgetItem[]>('showitem', []))
  //   );
  // }
  private log(message: string) {
  console.log(message);
}

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
  addItem(payload:BudgetItem):Observable<BudgetItem>{
    return this.http.post<BudgetItem>(`${this.ROOT_URL}/additem`,payload,this.httpOptions).pipe(
      tap((newpayload:BudgetItem) => this.log('Item Added')),
      catchError(this.handleError<BudgetItem>('addItem'))
    );
  }
  
  balanceAmount(email:string){
    return this.http.get(`${this.ROOT_URL}/balance/${email}`);
  }
  
  // showitems(email:string){
  //   return this.http.get(`${this.ROOT_URL}/showitems/${email}`);
  // }
  deleteItem(id:string):Observable<BudgetItem>{
    return this.http.delete<BudgetItem>(`${this.ROOT_URL}/deleteitem/${id}`).pipe(
    tap(_ => this.log(`Item Deleted`)),
    catchError(this.handleError<BudgetItem>('deleteItem'))
  );
  }
  updateItem(payload:BudgetItem):Observable<any>{
    return this.http.post(`${this.ROOT_URL}/updateitem`,payload,this.httpOptions).pipe(
    tap(_ => this.log(`Item Updated`)),
    catchError(this.handleError<any>('updateItem'))
  );
  }

  showDesc(email:string){
    return this.http.get(`${this.ROOT_URL}/showdesc/${email}`);
  }
  // incomeAmount(email:string){
  //   return this.http.get(`${this.ROOT_URL}/incomeamount/${email}`);
  // }
  // expenseAmount(email:string){
  //   return this.http.get(`${this.ROOT_URL}/expenseamount/${email}`);
  // }
  // showByDate(email:string,date:any){
  //   let payload={
  //     email:email,
  //     date:date
  //   }
    
  //   return this.http.post(`${this.ROOT_URL}/showbydate`,payload);
  // }

  // dailyItems(email:string){
  //   return this.http.get(`${this.ROOT_URL}/dailyitem/${email}`);
  // }
}
