
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const signInUrl = `${environment.apiUrl}auth/sign-in`;
    const payload = { email, password };
    return this.http.post(signInUrl, payload);
  }

  signOut(): Observable<any> {
    const signInUrl = `${environment.apiUrl}auth/sign-out`;
    return this.http.post(signInUrl, {});
  }

  siteListing(params: any): Observable<any> {
    const signInUrl = `${environment.apiUrl}sites`;
    return this.http.get(signInUrl, { params: params });
  }

  studyListing(params: any): Observable<any> {
    const signInUrl = `${environment.apiUrl}studies`;
    return this.http.get(signInUrl, { params: params });
  }
}
