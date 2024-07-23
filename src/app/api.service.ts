
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
 
  constructor() {}

  getToken(): string | null {
    // Implement logic to retrieve the token from local storage, session storage, etc.
    return localStorage.getItem('token');
  }

  signIn(email: string, password: string): Observable<any> {
   const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}auth/sign-in`;
    const payload = { email, password };
    return this.http.post(signInUrl, payload);
  }

  signOut(): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}auth/sign-out`;
    return this.http.post(signInUrl, {}, {headers});
  }

  siteListing(params: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}sites`;
    return this.http.get(signInUrl, { params: params, headers: headers });
  }

  studyListing(params: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}studies`;
    return this.http.get(signInUrl, { params: params, headers: headers });
  }

  measurements(params: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}lists/measurements`;
    return this.http.get(signInUrl, { params: params, headers: headers });
  }

  getvideodiarytopics(params: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}lists/video-diary-topics`;
    return this.http.get(signInUrl, { params: params, headers: headers });
  }

  postStudy(information: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}studies`;
    return this.http.post(signInUrl, information, {headers});
  }

  countries(): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const countries = `${environment.apiUrl}lists/countries`;
    return this.http.get(countries, { headers: headers });
  }

  postSite(information: any): Observable<any> {
    const  headers: any = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    const signInUrl = `${environment.apiUrl}sites`;
    return this.http.post(signInUrl, information, {headers});
  }

}
