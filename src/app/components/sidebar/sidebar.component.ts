import { Component } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (this.user?.avatar) {
      this.userService.getAvatar(this.user.avatar).subscribe({
        next: (response) => (this.avatarUrl = URL.createObjectURL(response)),
      });
    }
  }
}
