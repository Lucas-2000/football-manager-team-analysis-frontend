import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/auth/user/user.service';
import { TeamResponse } from 'src/app/services/team/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  teams: TeamResponse[] = [];
  teamLogos: string[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/team']);
    } else {
      this.router.navigate(['/login']);
    }

    this.getAllTeams();
  }

  getAllTeams() {
    const user = this.userService.getCurrentUser();

    this.teamService.findByUserId(user?.id).subscribe({
      next: (response) => {
        response.map((team) => {
          this.teams.push(team);
        });
      },
      complete: () => {
        const logoRequests = this.teams.map((team) =>
          this.teamService.getTeamLogo(team.teamLogo)
        );

        forkJoin(logoRequests).subscribe({
          next: (responseBlobs: Blob[]) => {
            this.teamLogos = responseBlobs.map((responseBlob: Blob) =>
              URL.createObjectURL(responseBlob)
            );
          },
          error: () => (this.error = 'It is not possible to loading the logos'),
        });
      },
      error: () => (this.error = 'Error on returning teams'),
    });
  }
}
