import { TeamResponse } from './../../services/team/team';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/auth/user/user.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';
import { PlayerResponse } from '../player/player/player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  teams: TeamResponse[] = [];
  players: PlayerResponse[] = [];
  selectedTeam: string = '';
  total: number = 0;
  meanPlayersAge: number = 0;
  youngestPlayer: string = '';
  oldestPlayer: string = '';
  bestPlayerTechniqueAtt: string = '';
  bestPlayerTechniqueAttValue: number = 0;
  bestPlayerMentalAtt: string = '';
  bestPlayerMentalAttValue: number = 0;
  bestPlayerPhysicalAtt: string = '';
  bestPlayerPhysicalAttValue: number = 0;
  error: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private teamService: TeamService,
    private userService: UserService,
    private playerService: PlayerService
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
        return (this.teams = response);
      },
      error: () => (this.error = 'Is not possible return teams'),
    });
  }

  getAllPlayers(selectedTeam: string) {
    const user = this.userService.getCurrentUser();

    const team = this.teams.find((team) => team.teamName === selectedTeam);

    this.playerService
      .findByUserIdAndTeamId(user?.id as string, team?.id as string)
      .subscribe({
        next: (response: PlayerResponse[]) => {
          this.players = response;
          this.totalPlayers();
          this.calculateMeanTeamAge();
          this.getYoungestPlayer();
          this.getOldestPlayer();
          this.getBestTeamMeanTechnicalAttributes();
          this.getBestTeamMeanMentalAttributes();
          this.getBestTeamMeanPhysicalAttributes();
        },
        error: () => (this.error = 'Is not possible return players'),
      });
  }

  changeTeam(selectedTeam: string) {
    this.getAllPlayers(selectedTeam);
  }

  totalPlayers() {
    return (this.total = this.players.length);
  }

  calculateMeanTeamAge() {
    let i = 1;
    let index = 0;
    let acc = 0;
    while (this.players.length >= i) {
      let age = this.calculateAge(this.players[index].birthdate);
      acc = age + acc;
      index++;
      i++;
    }

    return (this.meanPlayersAge = acc / this.totalPlayers());
  }

  getYoungestPlayer() {
    let index = 0;
    let youngestIndex = 0;
    let lowestAge = Infinity; // Inicializa com um valor alto

    while (index < this.players.length) {
      const age = this.calculateAge(this.players[index].birthdate);

      if (age < lowestAge) {
        lowestAge = age;
        youngestIndex = index;
      }

      index++;
    }

    this.youngestPlayer = this.players[youngestIndex].name;
  }

  getOldestPlayer() {
    let index = 0;
    let oldestIndex = 0;
    let highestAge = -Infinity; // Inicializa com um valor baixo

    while (index < this.players.length) {
      const age = this.calculateAge(this.players[index].birthdate);

      if (age > highestAge) {
        highestAge = age;
        oldestIndex = index;
      }

      index++;
    }

    this.oldestPlayer = this.players[oldestIndex].name;
  }

  getBestTeamMeanTechnicalAttributes() {
    let i = 1;
    let index = 0;
    let bestTeamMeanTechnicalIndex = 0;
    let highestAtt = 0;
    let totalPlayerTechnicalAtt = 0;

    while (this.players.length >= i) {
      totalPlayerTechnicalAtt =
        this.players[index].corners +
        this.players[index].crossing +
        this.players[index].dribbling +
        this.players[index].finishing +
        this.players[index].firstTouch +
        this.players[index].freeKickTaking +
        this.players[index].heading +
        this.players[index].longShots +
        this.players[index].longThrows +
        this.players[index].marking +
        this.players[index].passing +
        this.players[index].penaltyTaking +
        this.players[index].tackling +
        this.players[index].technique;

      if (totalPlayerTechnicalAtt > highestAtt) {
        highestAtt = totalPlayerTechnicalAtt;
        bestTeamMeanTechnicalIndex = index;
      }

      index++;
      i++;
    }

    this.bestPlayerTechniqueAtt = this.players[bestTeamMeanTechnicalIndex].name;
    this.bestPlayerTechniqueAttValue = totalPlayerTechnicalAtt / 14;
  }

  getBestTeamMeanMentalAttributes() {
    let i = 1;
    let index = 0;
    let bestTeamMeanMentalIndex = 0;
    let highestAtt = 0;
    let totalPlayerMentalAtt = 0;

    while (this.players.length >= i) {
      totalPlayerMentalAtt =
        this.players[index].agression +
        this.players[index].anticipation +
        this.players[index].bravery +
        this.players[index].composure +
        this.players[index].concentration +
        this.players[index].decisions +
        this.players[index].determination +
        this.players[index].flair +
        this.players[index].leadership +
        this.players[index].offTheBall +
        this.players[index].positioning +
        this.players[index].teamWork +
        this.players[index].vision +
        this.players[index].workRate;

      if (totalPlayerMentalAtt > highestAtt) {
        highestAtt = totalPlayerMentalAtt;
        bestTeamMeanMentalIndex = index;
      }

      index++;
      i++;
    }

    this.bestPlayerMentalAtt = this.players[bestTeamMeanMentalIndex].name;
    this.bestPlayerMentalAttValue = totalPlayerMentalAtt / 14;
  }

  getBestTeamMeanPhysicalAttributes() {
    let i = 1;
    let index = 0;
    let bestTeamMeanPhysicalIndex = 0;
    let highestAtt = 0;
    let totalPlayerPhysicalAtt = 0;

    while (this.players.length >= i) {
      totalPlayerPhysicalAtt =
        this.players[index].acceleration +
        this.players[index].agility +
        this.players[index].balance +
        this.players[index].jumpingReach +
        this.players[index].naturalFitness +
        this.players[index].pace +
        this.players[index].stamina +
        this.players[index].strenght;

      if (totalPlayerPhysicalAtt > highestAtt) {
        highestAtt = totalPlayerPhysicalAtt;
        bestTeamMeanPhysicalIndex = index;
      }

      index++;
      i++;
    }

    this.bestPlayerPhysicalAtt = this.players[bestTeamMeanPhysicalIndex].name;
    this.bestPlayerPhysicalAttValue = totalPlayerPhysicalAtt / 8;
  }

  calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
