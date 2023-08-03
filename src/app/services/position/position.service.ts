import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionResponse } from './position';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiPositionUrl = 'http://localhost:3333/positions/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  findAll(): Observable<PositionResponse[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.get<PositionResponse[]>(this.apiPositionUrl, {
      headers,
    });
  }
}
