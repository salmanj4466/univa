import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  console.log('ahsan');
  const info = localStorage.getItem('token');
  if (info) {
    return true; // User is authenticated, allow access
  } else {
    inject(Router).navigate(['/signin']);
    return false;
  }
};
