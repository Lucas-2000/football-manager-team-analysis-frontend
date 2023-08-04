export interface CreatePlayerResponse {
  id: string;
  name: string;
  birthdate: string;
  lenght: number;
  weight: number;
  jersey: number;
  playerImage: string;
  positionId: string;
  teamId: string;
  userId: string;
  corners: number;
  crossing: number;
  dribbling: number;
  finishing: number;
  firstTouch: number;
  freeKickTaking: number;
  heading: number;
  longShots: number;
  longThrows: number;
  marking: number;
  passing: number;
  penaltyTaking: number;
  tackling: number;
  technique: number;
  agression: number;
  anticipation: number;
  bravery: number;
  composure: number;
  concentration: number;
  decisions: number;
  determination: number;
  flair: number;
  leadership: number;
  offTheBall: number;
  positioning: number;
  teamWork: number;
  vision: number;
  workRate: number;
  acceleration: number;
  agility: number;
  balance: number;
  jumpingReach: number;
  naturalFitness: number;
  pace: number;
  stamina: number;
  strenght: number;
}

export interface CreatePlayerRequest {
  name: string;
  birthdate: string;
  lenght: number;
  weight: number;
  jersey: number;
  positionId: string;
  teamId: string;
  userId: string;
  corners: number;
  crossing: number;
  dribbling: number;
  finishing: number;
  firstTouch: number;
  freeKickTaking: number;
  heading: number;
  longShots: number;
  longThrows: number;
  marking: number;
  passing: number;
  penaltyTaking: number;
  tackling: number;
  technique: number;
  agression: number;
  anticipation: number;
  bravery: number;
  composure: number;
  concentration: number;
  decisions: number;
  determination: number;
  flair: number;
  leadership: number;
  offTheBall: number;
  positioning: number;
  teamWork: number;
  vision: number;
  workRate: number;
  acceleration: number;
  agility: number;
  balance: number;
  jumpingReach: number;
  naturalFitness: number;
  pace: number;
  stamina: number;
  strenght: number;
}

export interface UpdatePlayerRequest {
  id: string;
  name: string;
  birthdate: string;
  lenght: number;
  weight: number;
  jersey: number;
  positionId: string;
  teamId: string;
  userId: string;
  corners: number;
  crossing: number;
  dribbling: number;
  finishing: number;
  firstTouch: number;
  freeKickTaking: number;
  heading: number;
  longShots: number;
  longThrows: number;
  marking: number;
  passing: number;
  penaltyTaking: number;
  tackling: number;
  technique: number;
  agression: number;
  anticipation: number;
  bravery: number;
  composure: number;
  concentration: number;
  decisions: number;
  determination: number;
  flair: number;
  leadership: number;
  offTheBall: number;
  positioning: number;
  teamWork: number;
  vision: number;
  workRate: number;
  acceleration: number;
  agility: number;
  balance: number;
  jumpingReach: number;
  naturalFitness: number;
  pace: number;
  stamina: number;
  strenght: number;
}
