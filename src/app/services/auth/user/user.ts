export class User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;

  constructor() {
    this.id = '';
    this.username = '';
    this.email = '';
    this.avatar = null;
  }
}
