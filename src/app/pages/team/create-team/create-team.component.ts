import { Component, ElementRef, ViewChild } from '@angular/core';
import { CreateTeamFields } from './create-team';
import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  error: string = '';
  teamName: string = '';
  teamLocalization: string = '';
  teamCountry: string = '';
  teamLeague: string = '';
  teamGrade: string = 'A';
  teamLogo: File | null = null;
  isLoading: boolean = false;
  isOpen: boolean = false;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/team/create-team']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  validateForm({
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
  }: CreateTeamFields): boolean {
    if (
      !teamName ||
      !teamLocalization ||
      !teamCountry ||
      !teamLeague ||
      !teamGrade
    ) {
      this.error = 'Please, fill all the fields';
      return false;
    }

    return true;
  }

  addAnotherTeam() {
    this.teamName = '';
    this.teamLocalization = '';
    this.teamCountry = '';
    this.teamLeague = '';
    this.teamGrade = 'A';

    // using get element by id to clean the file input type
    const teamLogoInput = document.getElementById('logo') as HTMLInputElement;
    if (teamLogoInput) {
      teamLogoInput.value = '';
    }

    this.isOpen = false;
  }

  redirectToTeamPage() {
    return this.router.navigate(['/team']);
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    if (this.isOpen && event.target === this.modalRef.nativeElement) {
      this.closeModal();
    }
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.teamLogo = event.target.files[0];
    }
  }

  submitCreateTeamForm({
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
    teamLogo,
  }: CreateTeamFields): void {
    if (
      this.validateForm({
        teamName,
        teamLocalization,
        teamCountry,
        teamLeague,
        teamGrade,
      })
    ) {
      this.isLoading = true;
      const user = this.userService.getCurrentUser();

      this.teamService
        .create(
          {
            teamName,
            teamLocalization,
            teamCountry,
            teamLeague,
            teamGrade,
          },
          user?.id as string
        )
        .subscribe({
          next: (response) => {
            this.teamService.upload(teamLogo, response.id).subscribe({
              error: () => {
                this.isLoading = false;
                return (this.error = 'Error on upload');
              },
            });
          },
          complete: () => {
            this.isLoading = false;
            window.alert('Team created successfully');
            this.openModal();
          },
          error: () => {
            this.isLoading = false;
            this.error = 'Team already exists';
          },
        });
    }
  }
}
