import { Component } from '@angular/core';
import { ForgotPasswordFields } from './forgot-password';
import { ForgotPasswordService } from 'src/app/services/auth/forgot-password/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  validateForm(forgotPasswordFields: ForgotPasswordFields): boolean {
    if (!forgotPasswordFields.email) {
      this.error = 'Please, fill the field with your email';
      return false;
    }

    return true;
  }

  submitForgotPasswordForm(forgotPasswordFields: ForgotPasswordFields): void {
    if (this.validateForm(forgotPasswordFields)) {
      this.isLoading = true;
      this.forgotPasswordService.generateToken(forgotPasswordFields).subscribe({
        next: (response) => {
          this.forgotPasswordService
            .sendEmail({
              email: forgotPasswordFields.email,
              subject: 'Forgot Password',
              token: response.token,
            })
            .subscribe({
              complete: () => {
                this.isLoading = false;
                window.alert(
                  `Email send successful to ${forgotPasswordFields.email}`
                );
              },
              error: () => {
                this.error = 'Email not found';
                this.isLoading = false;
              },
            });
        },
        complete: () => (this.isLoading = false),
        error: () => {
          this.error = 'Email not found';
          this.isLoading = false;
        },
      });
    }
  }
}
