import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFields } from 'src/app/pages/auth/register/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3333/users';

  constructor(private httpClient: HttpClient) {}

  create({ username, email, password }: RegisterFields) {
    return this.httpClient.post(this.apiUrl, {
      username,
      email,
      password,
    });
  }
}
