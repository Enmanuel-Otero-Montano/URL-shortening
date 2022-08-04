import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(
    private readonly http: HttpClient,
    ) { }

  call (inputValue: string):Observable<any>{
    return this.http.get<any>(`https://api.shrtco.de/v2/shorten?url=${inputValue}`).pipe( 
      /* catchError ( err => {
        console.log("Sucedió un error")
        console.warn(err)
        return throwError(() => ("Error Personalizado"))
      }) */
    );
  }
  
}
