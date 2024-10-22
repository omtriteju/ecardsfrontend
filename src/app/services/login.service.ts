import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Method to send OTP to email
  sendOtp(email: string): Observable<string> {
    const url = `${this.baseUrl}/send-otp`; // No additional /users
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(url, null, {
      headers,
      params: { email }
    });
  }

  // Method to verify OTP for admin login
  verifyOtp(email: string, otp: string): Observable<any> {
    const url = `${this.baseUrl}/verify-otp`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, null, {
      headers,
      params: { email, otp }
    });
  }
}