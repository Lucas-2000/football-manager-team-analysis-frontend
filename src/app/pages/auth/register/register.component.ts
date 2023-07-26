import { Component } from '@angular/core';

import { RegisterService } from 'src/app/services/auth/register/register.service';
import { RegisterFields } from './register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordError: string = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  validateForm(registerFields: RegisterFields): boolean {
    if (registerFields.password.length < 8) {
      this.passwordError =
        'Please, passwords must be at least 8 characters long';
      return false;
    }

    return true;
  }

  submitRegisterForm(registerFields: RegisterFields): void {
    if (this.validateForm(registerFields))
      this.registerService.create(registerFields).subscribe({
        complete: () => {
          window.alert('User registered with success!');
          return this.router.navigate(['/login']);
        },
        error: () => window.alert(`Username or email already in use!`),
      });
  }
}
