import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/auth/user/user.service';
import { ExportService } from 'src/app/services/export/export.service';
import { TeamResponse } from 'src/app/services/team/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent {
  teams: TeamResponse[] = [];
  selectedTeam: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private exportService: ExportService,
    private userService: UserService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/export']);
    } else {
      this.router.navigate(['/login']);
    }

    this.checkTeamExists();
  }

  checkTeamExists() {
    const user = this.userService.getCurrentUser();

    this.teamService.findByUserId(user?.id).subscribe({
      next: (response: TeamResponse[]) => {
        return (this.teams = response);
      },
    });
  }

  exportInPdf() {
    const user = this.userService.getCurrentUser();

    if (!this.selectedTeam) return window.alert('Select a team to export');

    const team = this.teams.find((team) => team.teamName === this.selectedTeam);

    this.exportService
      .exportInPdf(user?.id as string, team?.id as string)
      .subscribe({
        next: (pdfBuffer: ArrayBuffer) => {
          const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.target = '_self';
          a.download = 'Relatorio.pdf';

          a.click();

          URL.revokeObjectURL(url);
        },
        complete: () => {
          window.alert('PDF downloaded with success');
        },
        error: () => {
          window.alert('Error on download report');
        },
      });
  }

  exportInExcel() {
    const user = this.userService.getCurrentUser();

    if (!this.selectedTeam) return window.alert('Select a team to export');

    const team = this.teams.find((team) => team.teamName === this.selectedTeam);

    this.exportService
      .exportInExcel(user?.id as string, team?.id as string)
      .subscribe({
        next: (excelBuffer: ArrayBuffer) => {
          const blob = new Blob([excelBuffer], { type: 'application/xlsx' });

          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.target = '_self';
          a.download = 'Players.xlsx';

          a.click();

          URL.revokeObjectURL(url);
        },
        complete: () => {
          window.alert('Worksheet downloaded with success');
        },
        error: () => {
          window.alert('Error on download report');
        },
      });
  }
}
