import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /* Authentication Methods */
  getToken(): string | null {
    // Implement logic to retrieve the token from local storage, session storage, etc.
    return localStorage.getItem('token');
  }

  signIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const signInUrl = `${environment.apiUrl}/auth/sign-in`;
    const payload = { email, password };
    return this.http.post(signInUrl, payload);
  }

  signOut(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const signOutUrl = `${environment.apiUrl}/auth/sign-out`;
    return this.http.post(signOutUrl, {}, { headers });
  }

  /* Data Retrieval Methods */
  siteListing(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const siteUrl = `${environment.apiUrl}/sites`;
    return this.http.get(siteUrl, { params, headers });
  }

  participants(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const participantUrl = `${environment.apiUrl}/participants`;
    return this.http.get(participantUrl, { params, headers });
  }

  studyListing(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const studyUrl = `${environment.apiUrl}/studies`;
    return this.http.get(studyUrl, { params });
  }

  measurements(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const measurementUrl = `${environment.apiUrl}/lists/measurements`;
    return this.http.get(measurementUrl, { params, headers });
  }

  getVideoDiaryTopics(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const videoDiaryTopicsUrl = `${environment.apiUrl}/lists/video-diary-topics`;
    return this.http.get(videoDiaryTopicsUrl, { params, headers });
  }

  getVisits(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const visitsUrl = `${environment.apiUrl}/visits`;
    return this.http.get(visitsUrl, { params, headers });
  }

  /* Data Manipulation Methods */
  postStudy(information: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const studyUrl = `${environment.apiUrl}/studies`;
    return this.http.post(studyUrl, information, { headers });
  }

  countries(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const countriesUrl = `${environment.apiUrl}/lists/countries`;
    return this.http.get(countriesUrl, { headers });
  }

  postSite(information: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const siteUrl = `${environment.apiUrl}/sites`;
    return this.http.post(siteUrl, information, { headers });
  }

  putSite(information: any, id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const siteUrl = `${environment.apiUrl}/sites/${id}`;
    return this.http.put(siteUrl, information, { headers });
  }

  getSiteById(id: number): Observable<any> {
    const siteUrl = `${environment.apiUrl}/sites/${id}`;
    return this.http.get(siteUrl);
  }

  getClinicalDevicesId(id: number): Observable<any> {
    const clinicalDevicesUrl = `${environment.apiUrl}/sites/${id}/clinical-devices`;
    return this.http.get(clinicalDevicesUrl);
  }

  deleteClinicalDevicesId(id: number, deleteId: number): Observable<any> {
    const clinicalDevicesUrl = `${environment.apiUrl}/sites/${id}/clinical-devices/${deleteId}`;
    return this.http.delete(clinicalDevicesUrl);
  }

  putClinicalDevicesId(id: number, deleteId: number, data: any): Observable<any> {
    const clinicalDevicesUrl = `${environment.apiUrl}/sites/${id}/clinical-devices/${deleteId}`;
    return this.http.put(clinicalDevicesUrl, data);
  }

  deleteClinicalDevices(id: number): Observable<any> {
    const clinicalDevicesUrl = `${environment.apiUrl}/sites/${id}/clinical-devices`;
    return this.http.delete(clinicalDevicesUrl);
  }

  addClinicalDevices(id: number, data: any): Observable<any> {
    const clinicalDevicesUrl = `${environment.apiUrl}/sites/${id}/clinical-devices`;
    return this.http.post(clinicalDevicesUrl, data);
  }

  studyManagerListing(): Observable<any> {
    const studyManagerUrl = `${environment.apiUrl}/users?role=Study Manager`;
    return this.http.get(studyManagerUrl);
  }

  getScreenings(): Observable<any> {
    const screeningsUrl = `${environment.apiUrl}/lists/forms?type=screenings`;
    return this.http.get(screeningsUrl);
  }

  getDemographics(): Observable<any> {
    const demographicsUrl = `${environment.apiUrl}/lists/forms?type=demographics`;
    return this.http.get(demographicsUrl);
  }

  getMeasurements(): Observable<any> {
    const measurementsUrl = `${environment.apiUrl}/lists/forms?type=measurements`;
    return this.http.get(measurementsUrl);
  }

  getStudyById(id: number): Observable<any> {
    const studyUrl = `${environment.apiUrl}/studies/${id}`;
    return this.http.get(studyUrl);
  }

  putStudy(information: any, id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const studyUrl = `${environment.apiUrl}/studies/${id}`;
    return this.http.put(studyUrl, information, { headers });
  }

  postSession(information: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    const sessionUrl = `${environment.apiUrl}/sessions`;
    return this.http.post(sessionUrl, information, { headers });
  }

  // New Methods
  getSessions(page: number, size: number, filters: any): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (filters.participant) {
      params = params.set('participant', filters.participant);
    }
    if (filters.study) {
      params = params.set('study', filters.study);
    }
    if (filters.site) {
      params = params.set('site', filters.site);
    }
    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }

    return this.http.get(`${environment.apiUrl}sessions`, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching session data:', error);
        return of({ data: [], total: 0 });
      })
    );
  }

  getSessionById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}sessions/${id}`);
  }

  createSession(sessionData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}sessions`, sessionData);
  }

  updateSession(id: number, sessionData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}sessions/${id}`, sessionData);
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}sessions/${id}`);
  }

  cancelVisit(id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}sessions/${id}`, {});
  }

  rescheduleVisit(sessionData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}sessions/${sessionData.id}`, sessionData);
  }

  getStudies(): Observable<any> {
    return this.studyListing({});
  }

  getSites(): Observable<any> {
    return this.siteListing({});
  }

  getParticipants(): Observable<any> {
    return this.participants({});
  }
}
