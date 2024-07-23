import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const info: any = localStorage.getItem('token');
  if (info) {
    return true; // User is authenticated, allow access
  } else {
    inject(Router).navigate(['/signin']);
    return false;
  }
};
