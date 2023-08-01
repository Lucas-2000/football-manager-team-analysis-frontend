import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamResponse } from './team';
import { CookieService } from 'ngx-cookie';
import { CreateTeamFields } from 'src/app/pages/team/create-team/create-team';

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

  create(
    {
      teamName,
      teamLocalization,
      teamCountry,
      teamLeague,
      teamGrade,
    }: CreateTeamFields,
    userId: string
  ): Observable<TeamResponse> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.post<TeamResponse>(
      this.apiUrlTeam,
      {
        teamName,
        teamLocalization,
        teamCountry,
        teamLeague,
        teamGrade,
        userId,
      },
      { headers }
    );
  }

  upload(teamLogo: File | null | undefined, teamId: string) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    const formData: FormData = new FormData();

    // Adicione o arquivo ao FormData (se existir)
    if (teamLogo) {
      formData.append('file', teamLogo, teamLogo.name);
    }

    return this.httpClient.post(this.apiUrlTeam + teamId + '/logo', formData, {
      headers,
    });
  }
}
