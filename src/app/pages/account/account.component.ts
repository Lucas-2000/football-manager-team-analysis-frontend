import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UpdateUserRequest, UserRequest } from './account';
import { User } from 'src/app/services/auth/user/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  avatar: File | null = null;
  error: string = '';
  isLoading: boolean = false;
  isOpen: boolean = false;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/login']);
    }

    this.getUserInformation();
  }

  getUserInformation() {
    const user = this.userService.getCurrentUser();

    this.email = user?.email as string;
    this.username = user?.username as string;
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.avatar = event.target.files[0];
    }
  }

  validateForm({ username, email }: UpdateUserRequest): boolean {
    if (!username || !email) {
      this.error = 'Please, fill all the fields';
      return false;
    }

    return true;
  }

  submitUpdateAccountForm({ username, email }: UpdateUserRequest) {
    if (!this.validateForm) return;

    const user = this.userService.getCurrentUser();

    this.isLoading = true;

    this.userService
      .update({
        id: user?.id as string,
        username,
        email,
      })
      .subscribe({
        next: () => {
          if (this.avatar !== null) {
            this.userService.upload(this.avatar, user?.id as string).subscribe({
              next: (response) => {
                const updatedUser: User = {
                  id: user?.id as string,
                  username: username,
                  email: email,
                  avatar: response.avatar,
                };
                this.userService.setCurrentUser(updatedUser);
              },
              error: () => {
                this.isLoading = false;
                this.error = 'Error on upload';
              },
            });
          }
        },
        complete: () => {
          window.alert('User updated successfully');
          window.location.reload();
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.error = 'Error on update user';
          this.isLoading = false;
        },
      });
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    if (this.isOpen && event.target === this.modalRef.nativeElement) {
      this.closeModal();
    }
  }

  deleteAccount() {
    const user = this.userService.getCurrentUser();

    this.isLoading = true;

    this.userService.delete(user?.id as string).subscribe({
      complete: () => {
        localStorage.removeItem('currentUser');
        this.cookieService.removeAll();
        window.alert('User deleted successfully');
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        window.alert('Error on delete user');
        this.isLoading = false;
      },
    });
  }
}
