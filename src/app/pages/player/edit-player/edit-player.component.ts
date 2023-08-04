import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/auth/user/user.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { PositionResponse } from 'src/app/services/position/position';
import { PositionService } from 'src/app/services/position/position.service';
import { TeamResponse } from 'src/app/services/team/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
})
export class EditPlayerComponent {
  multistepForm: FormGroup = new FormGroup({});
  step: number = 1;
  teams: TeamResponse[] = [];
  positions: PositionResponse[] = [];
  isLoading: boolean = false;
  error: string = '';
  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private teamService: TeamService,
    private userService: UserService,
    private positionService: PositionService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.cookieService.get('token')) {
      this.router.navigate([`/player/edit-player/${id}`]);
    } else {
      this.router.navigate(['/login']);
    }

    this.multistepForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      lenght: ['', Validators.required],
      weight: ['', Validators.required],
      jersey: ['', Validators.required],
      team: ['', Validators.required],
      position: ['', Validators.required],
      playerImage: [''],
      corners: ['', Validators.required],
      crossing: ['', Validators.required],
      dribbling: ['', Validators.required],
      finishing: ['', Validators.required],
      firstTouch: ['', Validators.required],
      freeKickTaking: ['', Validators.required],
      heading: ['', Validators.required],
      longShots: ['', Validators.required],
      longThrows: ['', Validators.required],
      marking: ['', Validators.required],
      passing: ['', Validators.required],
      penaltyTaking: ['', Validators.required],
      tackling: ['', Validators.required],
      technique: ['', Validators.required],
      agression: ['', Validators.required],
      anticipation: ['', Validators.required],
      bravery: ['', Validators.required],
      composure: ['', Validators.required],
      concentration: ['', Validators.required],
      decisions: ['', Validators.required],
      determination: ['', Validators.required],
      flair: ['', Validators.required],
      leadership: ['', Validators.required],
      offTheBall: ['', Validators.required],
      positioning: ['', Validators.required],
      teamWork: ['', Validators.required],
      vision: ['', Validators.required],
      workRate: ['', Validators.required],
      acceleration: ['', Validators.required],
      agility: ['', Validators.required],
      balance: ['', Validators.required],
      jumpingReach: ['', Validators.required],
      naturalFitness: ['', Validators.required],
      pace: ['', Validators.required],
      stamina: ['', Validators.required],
      strenght: ['', Validators.required],
    });

    this.findAllUserTeams();
    this.findAllPositions();
    this.getAllPlayerInformation(id as string);

    const idRoute = this.route.snapshot.paramMap.get('id');

    this.playerService.findByPlayerId(idRoute as string).subscribe({
      error: () =>
        this.router.navigate(['/404'], {
          queryParams: { message: 'Player not found' },
        }),
    });
  }

  findAllUserTeams() {
    const user = this.userService.getCurrentUser();

    this.teamService.findByUserId(user?.id).subscribe({
      next: (response: TeamResponse[]) => {
        return (this.teams = response);
      },
      error: () => (this.error = 'Is not possible return teams'),
    });
  }

  findAllPositions() {
    this.positionService.findAll().subscribe({
      next: (response: PositionResponse[]) => {
        return (this.positions = response);
      },
      error: () => (this.error = 'Is not possible return positions'),
    });
  }

  getAllPlayerInformation(id: string) {
    this.playerService.findByPlayerId(id).subscribe({
      next: (response) => {
        this.multistepForm.patchValue({
          name: response.name,
          birthdate: response.birthdate,
          lenght: response.lenght,
          weight: response.weight,
          jersey: response.jersey,
          corners: response.corners,
          crossing: response.crossing,
          dribbling: response.dribbling,
          finishing: response.finishing,
          firstTouch: response.firstTouch,
          freeKickTaking: response.freeKickTaking,
          heading: response.heading,
          longShots: response.longShots,
          longThrows: response.longThrows,
          marking: response.marking,
          passing: response.passing,
          penaltyTaking: response.penaltyTaking,
          tackling: response.tackling,
          technique: response.technique,
          agression: response.agression,
          anticipation: response.anticipation,
          bravery: response.bravery,
          composure: response.composure,
          concentration: response.concentration,
          decisions: response.decisions,
          determination: response.determination,
          flair: response.flair,
          leadership: response.leadership,
          offTheBall: response.offTheBall,
          positioning: response.positioning,
          teamWork: response.teamWork,
          vision: response.vision,
          workRate: response.workRate,
          acceleration: response.acceleration,
          agility: response.agility,
          balance: response.balance,
          jumpingReach: response.jumpingReach,
          naturalFitness: response.naturalFitness,
          pace: response.pace,
          stamina: response.stamina,
          strenght: response.strenght,
        });

        const team = this.teams.find((team) => team.id === response.teamId);

        const position = this.positions.find(
          (position) => position.id === response.positionId
        );

        this.multistepForm.patchValue({
          team: team?.teamName || '',
          position: position?.positionRole || '',
        });
      },
    });
  }

  get form() {
    return this.multistepForm.controls;
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submitUpdatePlayer() {
    if (this.multistepForm.valid) {
      this.isLoading = true;

      const id = this.route.snapshot.paramMap.get('id');

      const formData = this.multistepForm.value;

      const user = this.userService.getCurrentUser();

      const team = this.teams.find((team) => {
        return team.teamName === formData.team;
      });

      const position = this.positions.find((position) => {
        return position.positionRole === formData.position;
      });

      this.playerService
        .update({
          id: id as string,
          name: formData.name,
          birthdate: formData.birthdate,
          lenght: formData.lenght,
          weight: formData.weight,
          jersey: formData.jersey,
          positionId: position?.id as string,
          teamId: team?.id as string,
          userId: user?.id as string,
          corners: parseInt(formData.corners, 10),
          crossing: parseInt(formData.crossing, 10),
          dribbling: parseInt(formData.dribbling, 10),
          finishing: parseInt(formData.finishing, 10),
          firstTouch: parseInt(formData.firstTouch, 10),
          freeKickTaking: parseInt(formData.freeKickTaking, 10),
          heading: parseInt(formData.heading, 10),
          longShots: parseInt(formData.longShots, 10),
          longThrows: parseInt(formData.longThrows, 10),
          marking: parseInt(formData.marking, 10),
          passing: parseInt(formData.passing, 10),
          penaltyTaking: parseInt(formData.penaltyTaking, 10),
          tackling: parseInt(formData.tackling, 10),
          technique: parseInt(formData.technique, 10),
          agression: parseInt(formData.agression, 10),
          anticipation: parseInt(formData.anticipation, 10),
          bravery: parseInt(formData.bravery, 10),
          composure: parseInt(formData.composure, 10),
          concentration: parseInt(formData.concentration, 10),
          decisions: parseInt(formData.decisions, 10),
          determination: parseInt(formData.determination, 10),
          flair: parseInt(formData.flair, 10),
          leadership: parseInt(formData.leadership, 10),
          offTheBall: parseInt(formData.offTheBall, 10),
          positioning: parseInt(formData.positioning, 10),
          teamWork: parseInt(formData.teamWork, 10),
          vision: parseInt(formData.vision, 10),
          workRate: parseInt(formData.workRate, 10),
          acceleration: parseInt(formData.acceleration, 10),
          agility: parseInt(formData.agility, 10),
          balance: parseInt(formData.balance, 10),
          jumpingReach: parseInt(formData.jumpingReach, 10),
          naturalFitness: parseInt(formData.naturalFitness, 10),
          pace: parseInt(formData.pace, 10),
          stamina: parseInt(formData.stamina, 10),
          strenght: parseInt(formData.strenght, 10),
        })
        .subscribe({
          next: (response) => {
            if (this.selectedFile !== null) {
              this.playerService
                .upload(this.selectedFile, response.id)
                .subscribe({
                  error: () => {
                    this.isLoading = false;
                    window.alert('Error on player image upload');
                  },
                });
            }
          },
          complete: () => {
            this.isLoading = false;
            window.alert('Player updated successfully');
            this.router.navigate(['/player']);
          },
          error: (error) => {
            this.isLoading = false;
            window.alert('Error on player update');
          },
        });
    } else {
      window.alert('Fill all fields');
    }
  }
}
