import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.css'],
})
export class DeletePlayerComponent {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.cookieService.get('token')) {
      this.router.navigate([`/player/delete-player/${id}`]);
    } else {
      this.router.navigate(['/login']);
    }

    this.playerService.findByPlayerId(id as string).subscribe({
      error: () =>
        this.router.navigate(['/404'], {
          queryParams: { message: 'Player not found' },
        }),
    });
  }

  back() {
    this.router.navigate(['/player']);
  }

  deletePlayer() {
    const id = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;
    this.playerService.delete(id as string).subscribe({
      complete: () => {
        this.isLoading = false;
        window.alert('Player deleted successfully');
        this.router.navigate(['/player']);
      },
      error: () => {
        this.isLoading = false;
        window.alert('Error on delete player');
      },
    });
  }
}
