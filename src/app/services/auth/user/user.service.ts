import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadUserResponse, UserRequest } from 'src/app/pages/account/account';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUser = 'http://localhost:3333/users/';
  private apiUrlFiles = 'http://localhost:3333/files/';
  private currentUser: User | null = null;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  update({ id, username, email }: UserRequest) {
    return this.httpClient.put(this.apiUrlUser + id, {
      username,
      email,
    });
  }

  upload(
    avatar: File | null | undefined,
    id: string
  ): Observable<UploadUserResponse> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    const formData: FormData = new FormData();

    // Adicione o arquivo ao FormData (se existir)
    if (avatar) {
      formData.append('file', avatar, avatar.name);
    }

    return this.httpClient.post<UploadUserResponse>(
      this.apiUrlUser + id + '/avatar',
      formData,
      {
        headers,
      }
    );
  }

  delete(id: string) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.httpClient.delete(this.apiUrlUser + id, {
      headers,
    });
  }

  getAvatar(avatar: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/jpeg' });
    return this.httpClient.get(this.apiUrlFiles + avatar, {
      headers,
      responseType: 'blob',
    });
  }
}
