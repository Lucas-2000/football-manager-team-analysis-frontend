import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrlPlayers = 'http://localhost:3333/players/';

  constructor(private httpClient: HttpClient) {}
}
