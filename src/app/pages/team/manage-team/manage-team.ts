export interface UpdateTeamFields {
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: string;
  teamLogo?: File | null;
}
