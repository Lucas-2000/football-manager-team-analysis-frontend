export interface UserRequest {
  id: string;
  username: string;
  email: string;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
}

export interface UploadUserResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}
