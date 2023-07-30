import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamResponse } from './team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrlTeam = 'http://localhost:3333/teams/';

  constructor(private httpClient: HttpClient) {}

  find(teamId: string): Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(this.apiUrlTeam + teamId);
  }
}
