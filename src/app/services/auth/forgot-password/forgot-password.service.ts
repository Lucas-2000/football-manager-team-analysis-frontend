import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ForgotPasswordFields,
  SendEmailFields,
} from 'src/app/pages/auth/forgot-password/forgot-password';
import { ForgotPasswordResponse } from './forgot-password';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrlGenerateToken = 'http://localhost:3333/users/reset-password';
  private apiUrlSendEmail = 'http://localhost:3333/users/email';

  constructor(private httpClient: HttpClient) {}

  generateToken({
    email,
  }: ForgotPasswordFields): Observable<ForgotPasswordResponse> {
    return this.httpClient.post<ForgotPasswordResponse>(
      this.apiUrlGenerateToken,
      { email }
    );
  }

  sendEmail({ email, subject, token }: SendEmailFields) {
    return this.httpClient.post(this.apiUrlSendEmail, {
      email,
      subject,
      token,
    });
  }
}
