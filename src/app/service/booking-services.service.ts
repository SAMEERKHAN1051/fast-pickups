import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingServicesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  addBooking(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addBooking`, body);
  }
  verifyToken(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}codeVerify`, body);
  }
}
