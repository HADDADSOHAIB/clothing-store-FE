import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END } from 'backend';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  createAccount(user: User) {
    return this.http.post(BACK_END + 'users/signup', user) as Observable<any>;
  }

  login(credentials: {
    userEmail: string,
    password: string
  }) {
    return this.http.post(BACK_END + 'users/login', credentials) as Observable<any>;
  }
  constructor(private http: HttpClient) {}
}
