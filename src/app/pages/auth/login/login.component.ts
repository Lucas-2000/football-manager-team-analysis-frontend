import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthResponse, LoginFields } from './login';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { User } from 'src/app/services/auth/user/user';
import { UserService } from 'src/app/services/auth/user/user.service';

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
    private cookieService: CookieService,
    private userService: UserService
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
          const user: User = {
            id: userSummary.id,
            username: userSummary.username,
            email: userSummary.email,
            avatar: userSummary.avatar,
          };
          this.userService.setCurrentUser(user);
          this.cookieService.put('token', token);
          window.alert('Welcome to the football manager team analysis');
          return this.router.navigate(['/dashboard']);
        },
        error: () => (this.error = 'Username or password invalid'),
      });
    }
  }
}
