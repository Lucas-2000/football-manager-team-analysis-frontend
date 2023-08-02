import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { TeamResponse } from 'src/app/services/team/team';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  teams: TeamResponse[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/player']);
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
      error: () => (this.error = 'Is not possible return teams'),
    });
  }
}
