export interface ForgotPasswordFields {
  email: string;
}

export interface SendEmailFields {
  email: string;
  subject: string;
  token: string;
}
