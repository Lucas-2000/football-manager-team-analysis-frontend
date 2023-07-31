import { TeamResponse } from './../../services/team/team';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/auth/user/user.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  team: TeamResponse[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    this.checkTeamExists();
  }

  checkTeamExists() {
    const user = this.userService.getCurrentUser();

    this.teamService.findByUserId(user?.id).subscribe({
      next: (response: TeamResponse[]) => {
        return (this.team = response);
      },
      error: () => (this.error = 'Is not possible return teams'),
    });
  }
}
