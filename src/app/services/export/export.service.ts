import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiExportUrlPdf = 'http://localhost:3333/reports/players/';
  private apiExportUrlExcel = 'http://localhost:3333/reports/sheets/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  exportInPdf(userId: string, teamId: string) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.get(this.apiExportUrlPdf + userId + '/' + teamId, {
      headers,
      responseType: 'arraybuffer',
    });
  }

  exportInExcel(userId: string, teamId: string) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.get(this.apiExportUrlExcel + userId + '/' + teamId, {
      headers,
      responseType: 'arraybuffer',
    });
  }
}
