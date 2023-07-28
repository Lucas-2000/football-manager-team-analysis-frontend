import { Component } from '@angular/core';
import { ResetPasswordFields } from './reset-password';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/auth/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  password: string = '';
  userId: string = '';
  error: string = '';
  isExpired: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit() {
    const tokenRoute = this.route.snapshot.paramMap.get('token');
    this.resetPasswordService.findByToken(tokenRoute).subscribe({
      next: (response) => {
        this.userId = response.userId;

        if (new Date(response.expiresDate) < new Date()) {
          this.isExpired = true;
        }
      },
      error: () =>
        this.router.navigate(['/404'], {
          queryParams: { message: 'Invalid token' },
        }),
    });
  }

  validateForm(resetPasswordFields: ResetPasswordFields): boolean {
    if (!resetPasswordFields.password) {
      this.error = 'Please, fill the field with your password';
      return false;
    }

    if (resetPasswordFields.password.length < 8) {
      this.error = 'Please, password must be at least 8 characters long';
      return false;
    }

    return true;
  }

  submitResetPasswordForm(resetPasswordFields: ResetPasswordFields) {
    if (this.validateForm(resetPasswordFields)) {
      this.isLoading = true;
      this.resetPasswordService
        .reset(resetPasswordFields.password, this.userId)
        .subscribe({
          complete: () => {
            this.isLoading = false;
            window.alert('Password reset successfully');
            return this.router.navigate(['/login']);
          },
          error: () => {
            this.error = 'Error on reset';
            this.isLoading = false;
          },
        });
    }
  }
}
