import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CreatePlayerRequest, CreatePlayerResponse } from './player';
import { PlayerResponse } from 'src/app/pages/player/player/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrlPlayers = 'http://localhost:3333/players/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  create({
    name,
    birthdate,
    lenght,
    weight,
    jersey,
    positionId,
    teamId,
    userId,
    corners,
    crossing,
    dribbling,
    finishing,
    firstTouch,
    freeKickTaking,
    heading,
    longShots,
    longThrows,
    marking,
    passing,
    penaltyTaking,
    tackling,
    technique,
    agression,
    anticipation,
    bravery,
    composure,
    concentration,
    decisions,
    determination,
    flair,
    leadership,
    offTheBall,
    positioning,
    teamWork,
    vision,
    workRate,
    acceleration,
    agility,
    balance,
    jumpingReach,
    naturalFitness,
    pace,
    stamina,
    strenght,
  }: CreatePlayerRequest): Observable<CreatePlayerResponse> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.post<CreatePlayerResponse>(
      this.apiUrlPlayers,
      {
        name,
        birthdate,
        lenght,
        weight,
        jersey,
        positionId,
        teamId,
        userId,
        corners,
        crossing,
        dribbling,
        finishing,
        firstTouch,
        freeKickTaking,
        heading,
        longShots,
        longThrows,
        marking,
        passing,
        penaltyTaking,
        tackling,
        technique,
        agression,
        anticipation,
        bravery,
        composure,
        concentration,
        decisions,
        determination,
        flair,
        leadership,
        offTheBall,
        positioning,
        teamWork,
        vision,
        workRate,
        acceleration,
        agility,
        balance,
        jumpingReach,
        naturalFitness,
        pace,
        stamina,
        strenght,
      },
      { headers }
    );
  }

  upload(playerImage: File | null | undefined, playerId: string) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    const formData: FormData = new FormData();

    // Adicione o arquivo ao FormData (se existir)
    if (playerImage) {
      formData.append('file', playerImage, playerImage.name);
    }

    return this.httpClient.post(
      this.apiUrlPlayers + playerId + '/playerImage',
      formData,
      {
        headers,
      }
    );
  }

  findByUserIdAndTeamId(
    userId: string,
    teamId: string
  ): Observable<PlayerResponse[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.get<PlayerResponse[]>(
      this.apiUrlPlayers + userId + '/' + teamId,
      { headers }
    );
  }
}
