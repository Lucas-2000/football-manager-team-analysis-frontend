export interface LoginFields {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userSummary: {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string | null;
  };
}
