import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamResponse } from './team';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrlTeam = 'http://localhost:3333/teams/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  findByUserId(userId: string | undefined): Observable<TeamResponse[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.get<TeamResponse[]>(
      this.apiUrlTeam + 'user/' + userId,
      { headers }
    );
  }
}
