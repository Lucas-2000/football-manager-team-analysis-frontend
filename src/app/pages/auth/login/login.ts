export interface LoginFields {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userSummary: {};
}
