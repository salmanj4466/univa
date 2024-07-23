import {HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('token');
  debugger;
  console.log('ahsan');
  // Clone the request and add the authorization header
  if (authToken) {
    console.log('ahsan');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  return next(req);
};