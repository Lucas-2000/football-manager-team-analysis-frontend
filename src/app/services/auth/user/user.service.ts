import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlFiles = 'http://localhost:3333/files/';
  private currentUser: User | null = null;

  constructor(private httpClient: HttpClient) {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getAvatar(avatar: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/jpeg' });
    return this.httpClient.get(this.apiUrlFiles + avatar, {
      headers,
      responseType: 'blob',
    });
  }
}
