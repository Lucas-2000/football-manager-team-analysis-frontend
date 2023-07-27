import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthResponse, LoginFields } from './login';
import { LoginService } from 'src/app/services/auth/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  validateForm(loginFields: LoginFields): boolean {
    if (!loginFields.username || !loginFields.password) {
      this.error = 'Please, fill all the fields';
      return false;
    }

    return true;
  }

  submitLoginForm(loginFields: LoginFields): void {
    if (this.validateForm(loginFields)) {
      this.loginService.auth(loginFields).subscribe({
        next: ({ token, userSummary }: AuthResponse) => {
          window.alert('Welcome to the football manager team analysis');
          this.cookieService.put('token', token);
          return this.router.navigate(['/dashboard']);
        },
        error: () => (this.error = 'Username or password invalid'),
      });
    }
  }
}
