export interface CreateTeamFields {
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: string;
  teamLogo?: File | null;
}

export interface UpdateTeamFields {
  id: string | null;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: string;
  userId: string;
  teamLogo?: File | null;
}
