import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('--------------log--------------',req)
  return next(req);
};


@Injectable()
export class SampleInterceptor implements HttpInterceptor {
    constructor(public api: ApiService, public router: Router) { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


        const authToken = this.api.getToken();
        // Clone the request and add the authorization header
        if (authToken) {
          console.log('ahsan');
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`
            }
          });
        }
        return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      //handle your auth error or rethrow
      if (err.status === 401 || err.status === 403) {
          //navigate /delete cookies or whatever
          localStorage.clear();
          this.router.navigate(['/signin'])
          // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
          return of(err.message); // or EMPTY may be appropriate here
      }
      return throwError(err);
  }
}