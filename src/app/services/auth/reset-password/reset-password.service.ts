import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FindByTokenResponse } from './reset-password';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrlFindByToken = 'http://localhost:3333/users/find-by-token/';
  private apiUrlResetPassword = 'http://localhost:3333/users/';

  constructor(private httpClient: HttpClient) {}

  findByToken(tokenRoute: string | null): Observable<FindByTokenResponse> {
    return this.httpClient.get<FindByTokenResponse>(
      this.apiUrlFindByToken + tokenRoute
    );
  }

  reset(password: string, userId: string) {
    return this.httpClient.put(this.apiUrlResetPassword + userId, {
      password,
    });
  }
}
