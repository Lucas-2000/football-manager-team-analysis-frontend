export interface ForgotPasswordResponse {
  id: string;
  token: string;
  expiresDate: string;
  userId: string;
}
