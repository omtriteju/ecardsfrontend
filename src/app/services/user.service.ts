// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user); // Ensure this endpoint matches your backend
  }

  // Update an existing user
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${user.userId}`, user);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deactivate/${userId}`);
  }
}
