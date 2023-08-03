import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user/user.service';
import { TeamService } from 'src/app/services/team/team.service';
import { UpdateTeamFields } from './manage-team';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css'],
})
export class ManageTeamComponent {
  isLoadingUpdate: boolean = false;
  isLoadingDelete: boolean = false;
  error: string = '';
  id: string = '';
  teamName: string = '';
  teamLocalization: string = '';
  teamCountry: string = '';
  teamLeague: string = '';
  teamGrade: string = 'A';
  teamLogo: File | null = null;
  userId: string = '';
  isOpen: boolean = false;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idRoute = this.route.snapshot.paramMap.get('id');

    if (this.cookieService.get('token')) {
      this.router.navigate(['/team/manage-team/' + idRoute]);
    } else {
      this.router.navigate(['/login']);
    }

    this.teamService.findByTeamId(idRoute).subscribe({
      next: (response) => {
        this.id = response.id;
        this.teamName = response.teamName;
        this.teamLocalization = response.teamLocalization;
        this.teamCountry = response.teamCountry;
        this.teamLeague = response.teamLeague;
        this.teamGrade = response.teamGrade;
        this.userId = response.userId;
      },
      error: () =>
        this.router.navigate(['/404'], {
          queryParams: { message: 'Team not found' },
        }),
    });
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.teamLogo = event.target.files[0];
    } else {
      this.teamLogo = null;
    }
  }

  validateForm({
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
  }: UpdateTeamFields): boolean {
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

  submitUpdateTeamForm({
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
    teamLogo,
  }: UpdateTeamFields) {
    if (
      this.validateForm({
        teamName,
        teamLocalization,
        teamCountry,
        teamLeague,
        teamGrade,
      })
    ) {
      const id = this.route.snapshot.paramMap.get('id');
      const user = this.userService.getCurrentUser();
      this.isLoadingUpdate = true;
      this.teamService
        .update({
          teamName,
          teamLocalization,
          teamCountry,
          teamLeague,
          teamGrade,
          userId: user?.id as string,
          id,
        })
        .subscribe({
          next: (response) => {
            if (teamLogo !== null) {
              this.teamService.upload(teamLogo, response.id).subscribe({
                error: () => {
                  this.isLoadingUpdate = false;
                  return (this.error = 'Error on upload');
                },
              });
            }
          },
          complete: () => {
            this.isLoadingUpdate = false;
            window.alert('Team updated successfully');
          },
          error: () => {
            this.isLoadingUpdate = false;
            this.error = 'Error on update team';
          },
        });
    }
  }

  deleteTeam() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isLoadingDelete = true;

    this.teamService.delete(id).subscribe({
      complete: () => {
        this.isLoadingDelete = false;
        window.alert('Team delete successfully');
        return this.router.navigate(['/team']);
      },
      error: () => {
        this.isLoadingDelete = false;
        this.error = 'Error on delete team';
      },
    });
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
}
