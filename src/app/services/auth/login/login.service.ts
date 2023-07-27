import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginFields } from 'src/app/pages/auth/login/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3333/users/auth';

  constructor(private httpClient: HttpClient) {}

  auth({ username, password }: LoginFields): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.apiUrl, {
      username,
      password,
    });
  }
}
