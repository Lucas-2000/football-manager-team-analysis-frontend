import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from 'src/app/services/auth/user/user';
import { UserService } from 'src/app/services/auth/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  username: string = '';
  user: User | null = new User();
  avatarUrl: string = '';
  isLoading: boolean = false;
  isOpen: boolean = false;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (this.user?.avatar) {
      this.userService.getAvatar(this.user.avatar).subscribe({
        next: (response) => (this.avatarUrl = URL.createObjectURL(response)),
      });
    }
  }

  getFirstLetterOfUsername(): string {
    const username = this.user?.username;
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return '';
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

  logout() {
    localStorage.removeItem('currentUser');
    this.cookieService.removeAll();
    this.router.navigate(['/login']);
  }
}
